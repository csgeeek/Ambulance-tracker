package com.ambulansetracker;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class TrackerActivity extends AppCompatActivity {
    Driver driver;
    TextView textViewName;
    TextView textViewAmbNumber;
    TextView textViewDesc;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tracker);
        driver = (Driver) getIntent().getExtras().get(MainActivity.DRIVER_KEY);
        initComponents();
    }

    private void initComponents() {
        textViewName = findViewById(R.id.textViewName);
        textViewAmbNumber = findViewById(R.id.textViewAmbNumber);
        textViewDesc = findViewById(R.id.textViewDesc);
        textViewName.setText(driver.name);
        textViewAmbNumber.setText(driver.ambNumber);
        textViewDesc.setText(driver.desc);
    }
}