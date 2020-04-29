package com.applicaster.quickbrickinplayer.utils

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

fun writableMapOf(values: Map<String, *>): WritableMap {
    val map = Arguments.createMap()
    for ((key, value) in values) {
        when (value) {
            is Boolean -> map.putBoolean(key, value)
            is Double -> map.putDouble(key, value)
            is Int -> map.putInt(key, value)
            is String -> map.putString(key, value)
            is WritableMap -> map.putMap(key, value)
            is WritableArray -> map.putArray(key, value)
            else -> throw IllegalArgumentException("Unsupported value for key [$key]")
        }
    }
    return map
}

fun writableArrayOf(values: List<Any>): WritableArray {
    val array = Arguments.createArray()
    for (value in values) {
        when (value) {
            null -> array.pushNull()
            is Boolean -> array.pushBoolean(value)
            is Double -> array.pushDouble(value)
            is Int -> array.pushInt(value)
            is String -> array.pushString(value)
            is WritableArray -> array.pushArray(value)
            is WritableMap -> array.pushMap(value)
            else -> throw IllegalArgumentException("Unsupported type ${value::class.java.name}")
        }
    }
    return array
}