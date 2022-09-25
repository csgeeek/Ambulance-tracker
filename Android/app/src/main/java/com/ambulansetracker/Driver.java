package com.ambulansetracker;

import java.io.Serializable;

public class Driver implements Serializable {
    private String name;
    private String ambNumber;
    private String desc;

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
