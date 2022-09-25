package com.ambulansetracker;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;

import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.Looper;

import android.preference.PreferenceManager;
import android.util.Log;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;

import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.Priority;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;


public class TrackerService extends Service {
    private final String URL = "http://192.168.0.129:5000";
    private final String COORDS_EVENT = "send-coords";
    Driver driver;
    Socket socket;
    LocationCallback locationCallback = new LocationCallback() {
        @Override
        public void onLocationResult(@NonNull LocationResult locationResult) {
            super.onLocationResult(locationResult);
            Log.d("LOCATION", locationResult.getLastLocation().getLongitude() + " " + locationResult.getLastLocation().getLatitude());
            JSONObject jsonObject = new JSONObject();
            if(locationResult.getLastLocation()!=null) {
                try {
                    jsonObject.put("id", socket.id());
                    jsonObject.put("loaded", true);
                    jsonObject.put("name", driver.getName());
                    jsonObject.put("ambNumber", driver.getAmbNumber());
                    jsonObject.put("desc", driver.getDesc());
                    jsonObject.put("latitude", locationResult.getLastLocation().getLatitude());
                    jsonObject.put("longitude", locationResult.getLastLocation().getLongitude());
                    socket.emit(COORDS_EVENT, jsonObject.toString());
                    Log.d("EMIT", "onLocationResult: DATA SEND");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    };

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        driver = (Driver) intent.getExtras().get(TrackerActivity.DRIVER_KEY_SERVICE);
        try {
            startLocationService();
        } catch (Exception ex) {
            Log.d("TRACKER", "onStartCommand: " + ex.getMessage());
            System.out.println(ex.getMessage());
            System.exit(0);
        }
        return Service.START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
//        PreferenceManager.getDefaultSharedPreferences(getApplicationContext()).edit().remove("x-access-token").apply();
//        socket.close();
    }
    @RequiresApi(api = Build.VERSION_CODES.O)
    private void startLocationService() throws URISyntaxException {
        socket = IO.socket(URL);
        socket.connect();
        String channelID = "channelID";
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        Intent resIntent = new Intent();
        PendingIntent pendingIntent = PendingIntent.getActivity(getApplicationContext(), 0, resIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext(), channelID);
        builder.setContentTitle("Title");
        builder.setContentText("TEXT");
        builder.setContentIntent(pendingIntent);
        builder.setAutoCancel(false);
        builder.setPriority(NotificationCompat.PRIORITY_HIGH);
        builder.setDefaults(NotificationCompat.DEFAULT_ALL);

        NotificationChannel notificationChannel = new NotificationChannel(channelID, "TITLE", NotificationManager.IMPORTANCE_HIGH);
        notificationChannel.setDescription("DISC");
        notificationManager.createNotificationChannel(notificationChannel);
        LocationRequest locationRequest = LocationRequest.create().setInterval(2000).setFastestInterval(1000 * 3).setPriority(Priority.PRIORITY_HIGH_ACCURACY);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        LocationServices.getFusedLocationProviderClient(this).requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
        startForeground(321, builder.build());
    }
}
