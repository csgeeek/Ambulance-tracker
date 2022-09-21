package com.ambulansetracker;

import android.preference.PreferenceManager;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface RetrofitInterface {
    @POST("/api/auth/login")
    Call<LoginResult> executeLogin(@Body HashMap<String, String> hashMap);
    @GET("/api/auth/name")
    Call<Driver> validateToken(@Header("x-access-token") String token);

}
