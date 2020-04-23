package com.applicaster.quickbrickinplayer.implementation;

import android.content.Context;

import androidx.annotation.NonNull;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

public class LocalNotificationManager {

    private static final String TAG = "LocalNotificationManager";
    private final Context context;

    public LocalNotificationManager(Context context) {
        this.context = context;
    }

    public void presentLocalNotification(JSONObject jsonObject) throws JSONException {
//        // Tiny optimization: do not decode entire payload if it's scheduled.
//        // Maybe a bad idea, since payload can have errors that could be found early
//        long unixTimestampMs = jsonObject.optLong("unixTimestamp", 0) * 1000;
//        if(unixTimestampMs < System.currentTimeMillis()) {
//            if(0 != unixTimestampMs) {
//                APLogger.warn(TAG, "Moment in the past is passed to presentLocalNotification");
//            }
//            LocalNotificationPayload notification = parse(jsonObject.toString(), LocalNotificationPayload.class);
//            new NotificationBuilder(context).presentNotification(notification);
//        } else {
//            String identifier = jsonObject.getString("identifier");
//            LocalNotificationBroadcastReceiver.scheduleNotification(context, identifier, unixTimestampMs, jsonObject.toString());
//        }
    }

    private static <T> T parse(@NonNull String jsonPayload, @NonNull Class<T> cls) {
        return new Gson().fromJson(jsonPayload, cls);
    }

}
