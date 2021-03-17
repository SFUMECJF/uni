package unsw.venues;

import java.util.Calendar;
import java.util.Date;
import java.time.LocalDate;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Venue class for COMP2511 assignment
 * 
 * A basic class to allow the easy classification of venues.
 * Separate list to allow for easy management of room sizes
 * 
 * @author John Dao (z5258962)
 * 
 */

public class Venue {
    public static ArrayList<Venue> venues = new ArrayList<Venue>();
    
    public String venueName;
    public ArrayList<Room> rooms;
    public ArrayList<Room> smallRooms;
    public ArrayList<Room> mediumRooms;
    public ArrayList<Room> largeRooms;
    
    // Constructor for Venue.
    public Venue(String venueName){
        this.venueName = venueName;
        this.rooms = new ArrayList<>();
        this.smallRooms = new ArrayList<>();
        this.mediumRooms = new ArrayList<>();
        this.largeRooms = new ArrayList<>();
    }

    // Methods for class Venue

    // Static Methods

    // Static method to find venue in venueList
    public static Venue findVenue(String venue) {
        for (Venue aVenue : venues) {
            if (aVenue.getvenueName().equals(venue)) {
                return aVenue;
            }
        }
        return null;
    }

    // Adds room into the current venue.
    public static void addRoom(String venue, String room, String size) {
        Venue curVenue;
        if ((curVenue = findVenue(venue)) == null) {
            curVenue = new Venue(venue);
            venues.add(curVenue);
            curVenue.createRoom(room, size);
        } else {
            curVenue.createRoom(room, size);
        }  
    }
 
    // NON-Static methods

    // Creates room if doesn't exist.
    public void createRoom(String roomName, String size) {
        if (findRoom(roomName) == false) {
            Room newRoom = new Room(roomName, size);
            rooms.add(newRoom); 

            // adds the room into the room size index
            if (size.equals("small")) {
                smallRooms.add(newRoom);
            }
            else if (size.equals("medium")) {
                mediumRooms.add(newRoom);
            }
            else {
                largeRooms.add(newRoom);
            }
        }
    }

    // Method to find a room already exists.
    public boolean findRoom(String roomString) {
        for (Room aRoom : rooms) {
            if (aRoom.getroomName().equals(roomString)) {
                return true;
            }
        }
        //Return false in case of invalid input
        return false;
    }

    // JSON array output for list command. 
    // Will return all rooms and their reservations
    protected JSONArray getList() {
        JSONArray listResult = new JSONArray();

        for (Room aRoom : rooms) {
            JSONObject singleRoom = new JSONObject();
            singleRoom.put("room", aRoom.getroomName());
            singleRoom.put("reservations", aRoom.getReservations());
            listResult.put(singleRoom);
        }

        return listResult;
    }


    // Override toString for class Venue
    @Override
    public String toString() {
        return "Venue [venueName=" + getvenueName() + "]";
    }

    // Appropriate getters and setters
	public String getvenueName() {
		return venueName;
    }

}