package com.dgera.teya;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import androidx.annotation.Nullable;
import com.reactnativenavigation.NavigationActivity;


public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setSplashLayout();
    }

    private void setSplashLayout() {
        ImageView img = new ImageView(this);
        img.setImageDrawable(getDrawable(R.drawable.background_splash));
        img.setScaleType(ImageView.ScaleType.FIT_XY);
        setContentView(img);
    }
}
