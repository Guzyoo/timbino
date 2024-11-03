# Google Sign-In
-keep class com.google.android.gms.** { *; }
-keep class com.google.api.client.** { *; }
-keep class com.google.gson.** { *; }
-keepattributes Signature
-keepattributes *Annotation*
-keep class * extends com.google.android.gms.common.api.GoogleApiClient { *; }
-keep class * implements com.google.android.gms.common.api.GoogleApiClient$ConnectionCallbacks { *; }
-keep class * implements com.google.android.gms.common.api.GoogleApiClient$OnConnectionFailedListener { *; }