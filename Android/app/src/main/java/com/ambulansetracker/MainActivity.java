package com.ambulansetracker;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission.INTERNET;
import static android.Manifest.permission.FOREGROUND_SERVICE;


public class MainActivity extends AppCompatActivity {

    // finals
    final static public String DRIVER_KEY = "driver_key";
    ArrayList<String> permissions;
    ArrayList<String> permissionsToRequest;
    ArrayList<String> permissionsRejected;
    private final static int ALL_PERMISSIONS_RESULT = 101;

    SharedPreferences sharedPreferences;
    private final String URL = "http://192.168.0.129:5000";
    EditText editTextUsername;
    EditText editTextPassword;
    Button buttonLogin;
    Retrofit retrofit;
    RetrofitInterface retrofitInterface;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // check for permissions
        permissions = new ArrayList<>();
        permissionsRejected = new ArrayList<>();
        permissions.add(ACCESS_FINE_LOCATION);
        permissions.add(ACCESS_COARSE_LOCATION);
        permissions.add(INTERNET);
        permissions.add(FOREGROUND_SERVICE);
        permissionsToRequest = findUnAskedPermissions(permissions);
        if(permissionsToRequest.size()>0)
            ActivityCompat.requestPermissions(MainActivity.this,
                    permissionsToRequest.toArray(new String[permissionsToRequest.size()]),
                    ALL_PERMISSIONS_RESULT);
        // init Retrofit
        retrofit = new Retrofit.Builder().baseUrl(URL).addConverterFactory(GsonConverterFactory.create()).build();
        retrofitInterface = retrofit.create(RetrofitInterface.class);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        setContentView(R.layout.activity_main);
        initComponents();
    }

    private void validateToken() {

        String token = sharedPreferences.getString("x-access-token", null);
        if (token==null)
            return;
        Call<Driver> call = retrofitInterface.validateToken(token);

        call.enqueue(new Callback<Driver>() {
            @Override
            public void onResponse(Call<Driver> call, Response<Driver> response) {
                // token is active
                if(response.code()==200) {
                    Driver driver = response.body();
                    Intent intent = new Intent(MainActivity.this, TrackerActivity.class);
                    intent.putExtra(MainActivity.DRIVER_KEY, driver);
                    startActivity(intent);
                    finish();
                    Toast.makeText(MainActivity.this, "Valid token", Toast.LENGTH_LONG);
                }
                // invalid or expired token
                if(response.code()==404) {
                    Toast.makeText(MainActivity.this, "Invalid token", Toast.LENGTH_LONG);
                }
            }

            @Override
            public void onFailure(Call<Driver> call, Throwable t) {
                Toast.makeText(MainActivity.this, t.getMessage(), Toast.LENGTH_LONG);
            }
        });
    }

    private void initComponents() {
        editTextUsername = findViewById(R.id.editTextUsername);
        editTextPassword = findViewById(R.id.editTextPassword);
        buttonLogin = findViewById(R.id.buttonLogin);
        buttonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                handleLogin();
            }
        });
    }

    private void handleLogin() {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("name", editTextUsername.getText().toString());
        hashMap.put("password", editTextPassword.getText().toString());
        Call<LoginResult> call = retrofitInterface.executeLogin(hashMap);
        call.enqueue(new Callback<LoginResult>() {
            @Override
            public void onResponse(Call<LoginResult> call, Response<LoginResult> response) {
                // login successful
                if(response.code()==200) {
                    sharedPreferences.edit().putString("x-access-token", response.body().driver).apply();
                    Toast.makeText(MainActivity.this, "Logged in",
                            Toast.LENGTH_LONG).show();
                    validateToken();
                }
                // wrong credentials
                if(response.code()==404) {
                    Toast.makeText(MainActivity.this, "Wrong Credentials",
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResult> call, Throwable t) {
                Toast.makeText(MainActivity.this, t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {

            case ALL_PERMISSIONS_RESULT:
                for (String perms : permissionsToRequest) {
                    if (!hasPermission(perms)) {
                        permissionsRejected.add(perms);
                    }
                }

                if (permissionsRejected.size() > 0) {
                    // TODO app didn't get all permissions
                    Toast.makeText(this, "I don't have permissions", Toast.LENGTH_LONG);
                }

                break;
        }

    }
    private ArrayList<String> findUnAskedPermissions(ArrayList<String> wanted) {
        ArrayList<String> result = new ArrayList<>();
        for (String permission : wanted) {
            if(!hasPermission(permission))
                result.add(permission);
        }
        return result;
    }

    private boolean hasPermission(String permission) {
        int a = ActivityCompat.checkSelfPermission(this, permission);
        return a != -1;
    }
}