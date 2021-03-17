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
 * A protected class to allow the easy creation and storage of reservations.
 * A more complex class. Protected for my own logic.
 * @author John Dao (z5258962)
 * 
 */

public class Reservation {
    protected String id;
    protected LocalDate start;
    protected LocalDate end;
    protected int small;
    protected int medium;
    protected int large;
    protected Venue venue;
    protected ArrayList<Room> reserved;

    /**
     * 
     * @param id Reservation id
     * @param start event start
     * @param end event end
     * @param small amount of small rooms
     * @param medium amount of medium rooms
     * @param large amount of large rooms
     */
    public Reservation(String id, LocalDate start, LocalDate end,
        int small, int medium, int large) {
        
        this.id = id;
        this.start = start;
        this.end = end;
        this.reserved = new ArrayList<>();

        this.small = small;
        this.medium = medium;
        this.large = large;
    }

    /**
     * 
     * @param venue Venue to be added via the reservation
     * @param reservation reservation attempted to be added
     * @return whether reservation was successful/had no clashes
     * 
     * makeReservation is the main checher and will allow for the future adding
     * of classes
     */
    public boolean makeReservation(Venue venue, Reservation reservation) {
        if (checkDates(reservation, venue.rooms) == false) {
            return false;
        }

        if (reservation.getSmall() != 0) {
            reserveRoom(venue.smallRooms, reservation.small, reservation.start,
                        reservation.end, reservation);
        }
        if (reservation.getMedium() != 0) {
            reserveRoom(venue.mediumRooms, reservation.medium, reservation.start, 
                        reservation.end, reservation);
        }
        if (reservation.getLarge() != 0) {
            reserveRoom(venue.largeRooms, reservation.large, reservation.start, 
                        reservation.end, reservation);
        }

        setVenue(venue);
        return true;
    }
    
    // Primary "room reserver" Nothing much else to be said.
    // Adds onto the main reservaitons Arraylists in:
    // Room, Reservation. 
    public void reserveRoom(ArrayList<Room> rooms, int total, LocalDate start,
                            LocalDate end, Reservation reservation) {                       
        int counter = 0;                          
        for (Room aRoom : rooms) {
            if (counter == total) {break;}
            boolean avail = checkAvail(start, end, aRoom);
            if (avail == true) {
                aRoom.reservations.add(reservation);
                reservation.reserved.add(aRoom);
                counter++;
            }
        }
    }

    // Checks if dates clash. There is no date clash if the event is the same
    // In case the event is moved forward but doesn't clash.
    public boolean checkDates(Reservation reservation, ArrayList<Room> rooms) {
        int foundS = 0;
        int foundM = 0;
        int foundL = 0;
        for (Room aRoom : rooms) {
            boolean avail = checkAvail(reservation.getStart(), 
                                        reservation.getEnd(), aRoom);

            if (avail == true) {
                if (aRoom.getSize().equals("small")) {
                    foundS++;
                } else if (aRoom.getSize().equals("medium")) {
                    foundM++;
                } else if (aRoom.getSize().equals("large")) {
                    foundL++;
                }
            }
        }

        if (reservation.getSmall() <= foundS 
            && reservation.getMedium() <= foundM
            && reservation.getLarge() <= foundL) {
            return true;
        } else {
            return false;
        }
    }

    // Compares dates to see if given start and end is possible in room.
    // Is constantly called to check every single reservation in possible room
    public boolean checkAvail(LocalDate start, LocalDate end, Room aRoom) {
        if (!aRoom.reservations.isEmpty()) {
            for (Reservation reserved : aRoom.reservations) {
                if (start.isAfter(reserved.getStart()) && 
                    start.isBefore(reserved.getEnd())) {return false;}
                if (end.isAfter(reserved.getStart()) && 
                    end.isBefore(reserved.getEnd())) {return false;}
                if (start.isEqual(reserved.getStart()) || 
                    start.isEqual(reserved.getEnd())) {return false;}
                if (end.isEqual(reserved.getStart()) || 
                    end.isEqual(reserved.getEnd())) {return false;}
                if (reserved.getStart().isAfter(start) && 
                    reserved.getEnd().isBefore(end)) {return false;}
            }
        }
        return true;
    }

    // sets reservation to null and removes all reservations from Rooms.
    protected void cancelRes(Reservation reservation) {
        for (Room aRoom : reservation.reserved) {
            aRoom.remRes(reservation);
        }
        this.id = null;
        VenueHireSystem.removeReservation(reservation);
    }

    // GETTERS AND SETTERS for most variables. Self explanitory.

    public LocalDate getStart() {
        return start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public int getSmall() {
        return small;
    }

    public int getMedium() {
        return medium;
    }

    public int getLarge() {
        return large;
    }

    public String getId() {
        return id;
    }


    // sets venue. Used in creating reservation
    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    // autogenerated toString override
    @Override
    public String toString() {
        return "Reservation [end=" + end + ", id=" + id + ", large=" + large 
                + ", medium=" + medium + ", small=" + small
                + ", start=" + start + ", venue=" + venue + "]";
    }

    
}