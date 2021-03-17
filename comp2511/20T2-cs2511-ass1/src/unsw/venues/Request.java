package unsw.venues;

import java.util.Calendar;
import java.util.Date;
import java.security.spec.DSAGenParameterSpec;
import java.time.LocalDate;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Request class for COMP2511 assignment
 * 
 * A class to allow for the implementation of request.
 * This class is the main hub to control all requests going in and out.
 * JSON returns are controlled via the function jsonReturnStatus and enables
 * Re-use/reduction of repetition
 * 
 * @author John Dao (z5258962)
 * 
 */

public class Request {

    /**
     * 
     * @param newReservation is the new reservation to be added 
     * @return JSONObject as required with all data.
     */
    public static JSONObject request(Reservation newReservation) {
        
        boolean reserved = false;

        for (Venue aVenue : Venue.venues) {
            if (reserved == true) {
                break;
            }

            // Check if reservations are possible based on size
            if (newReservation.checkDates(newReservation, aVenue.rooms) == true) {
                // Attempt to reserve rooms. Returns true if successful
                reserved = newReservation.makeReservation(aVenue, 
                                                        newReservation);
            }
        }
        return jsonReturnStatus(reserved, newReservation);
    }

    /**
     * 
     * @param reserved The trigger for what is needed. True for found. etc.
     * @param newReservation Same as above.
     * @return  The man return used to get the actual status. 
     *          If true, gets success JSON. If false, returns rejected
     */
    public static JSONObject jsonReturnStatus(boolean reserved, Reservation newReservation) {
        JSONObject result = new JSONObject();
        if (reserved == true) {
            result.put("status", "success");
            result.put("venue", newReservation.venue.getvenueName());
            JSONArray reservedRooms = new JSONArray();
            for (Room aRoom : newReservation.reserved) {
                reservedRooms.put(aRoom.getroomName());
            }
            result.put("rooms", reservedRooms);
            VenueHireSystem.addReservation(newReservation);
            return result;
        } else {
            result.put("status", "rejected");
            return result;
        }
    }        
}