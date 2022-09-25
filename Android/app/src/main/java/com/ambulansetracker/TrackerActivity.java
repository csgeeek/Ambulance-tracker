package com.ambulansetracker;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import io.socket.client.IO;
import io.socket.client.Socket;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;

public class TrackerActivity extends AppCompatActivity {
    Driver driver;
    private final String URL = "http://192.168.0.129:5000";
    private Socket socket;
    final static public String DRIVER_KEY_SERVICE = "driver_key_service";
    TextView textViewName;
    TextView textViewAmbNumber;
    TextView textViewDesc;


    Button buttonStartTracking;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tracker);
        driver = (Driver) getIntent().getExtras().get(MainActivity.DRIVER_KEY);
        initComponents();
    }

    private void initConnection() throws URISyntaxException {
        socket = IO.socket(URL);
        socket.connect();
    }


    private void initComponents() {
        textViewName = findViewById(R.id.textViewName);
        textViewAmbNumber = findViewById(R.id.textViewAmbNumber);
        textViewDesc = findViewById(R.id.textViewDesc);
        buttonStartTracking = findViewById(R.id.buttonStartTracking);
        textViewName.setText(driver.getName());
        textViewAmbNumber.setText(driver.getAmbNumber());
        textViewDesc.setText(driver.getDesc());
        buttonStartTracking.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startService(new Intent(TrackerActivity.this, TrackerService.class).putExtra(TrackerActivity.DRIVER_KEY_SERVICE, driver));
            }
        });
    }


}