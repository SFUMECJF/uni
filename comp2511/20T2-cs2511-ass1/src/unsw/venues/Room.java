package unsw.venues;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.time.LocalDate;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;


import org.json.JSONArray;
import org.json.JSONObject;

public class Room{
    public String roomName;
    public String size;
    protected ArrayList<Reservation> reservations;

    // Constructor for new room
    public Room(String roomName, String size) {
        this.roomName = roomName;
        this.size = size;
        this.reservations = new ArrayList<>();
    }

    // Methods for class Room

    public void remRes(Reservation toRem) {
        int counter = 0;
        for (Reservation i : reservations) {
            if (i.equals(toRem)) {
                reservations.remove(counter);
                break;
            }
            counter++;
        }
    }

    // Method that returns all reservations in JSONArray
    public JSONArray getReservations() {
        JSONArray allReservations = new JSONArray();
        int counter = 0;
        ArrayList<Reservation> sorted = sortByDate(reservations);
        for (Reservation aReserve : sorted) {
            JSONObject resOBJ = new JSONObject();
            resOBJ.put("id", aReserve.getId());
            resOBJ.put("start", aReserve.getStart());
            resOBJ.put("end", aReserve.getEnd());
            allReservations.put(resOBJ);
        }
        return allReservations;
    }

    public static ArrayList<Reservation> sortByDate(ArrayList<Reservation> reservations) {
        Collections.sort(reservations, new Comparator<Reservation>() {
            @Override
            public int compare (Reservation curr, Reservation next) {
                return curr.getStart().compareTo(next.getStart());
            }
        });
            return reservations;
    }

    public String getroomName() {
        return roomName;
    }
    public String getSize() {
		return size;
    }
    
}