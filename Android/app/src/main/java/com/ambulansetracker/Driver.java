package com.ambulansetracker;

import java.io.Serializable;

public class Driver implements Serializable {
    String name;
    String ambNumber;
    String desc;

    public String getName() {
        return name;
    }

    public String getAmbNumber() {
        return ambNumber;
    }

    public String getDesc() {
        return desc;
    }
}
