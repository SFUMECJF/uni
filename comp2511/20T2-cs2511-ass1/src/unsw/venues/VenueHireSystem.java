/**
 *
 */
package unsw.venues;

import java.time.LocalDate;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Venue Hire System for COMP2511.
 *
 * A basic prototype to serve as the "back-end" of a venue hire system. Input
 * and output is in JSON format.
 *
 * @author Robert Clifton-Everest
 * 
 * Completed by 
 * @author John Dao (z5258962)
 * 
 * RUN IN DIRECTORY SRC USING (windows)
 * javac -cp ".;../lib/json.jar" unsw/venues/*.java
 * java -ea -cp ".;../lib/json.jar" unsw/venues/VenueHireSystem
 */
public class VenueHireSystem {

    /**
     * Constructs a venue hire system. Initially, 
     * the system contains no venues,
     * rooms, or bookings.
    */
    protected static ArrayList<Reservation> reservationList = 
                                    new ArrayList<Reservation>();

    public VenueHireSystem() {
        //STUb left empty
    }

    // STATIC FUNCTIONS

    /**
     * findReservation, simple return of Reservation if existing
     * @param reserved is returned reservation based on given Id
     * @return null will be used to identify reservations that dont exist yet
     */

    protected static Reservation findReservation(String id) {
        for (Reservation reserved : reservationList) {
            if (id.equals(reserved.getId())) {
                return reserved;
            }
        }
        return null;
    }

    // Simple checker to see if change is valid/not same as old.
    protected static boolean checkChange(Reservation a, Reservation b) {
        if (a.getStart().isEqual(b.getStart()) && 
            a.getEnd().isEqual(b.getEnd())) {
            if (a.getSmall() == b.getSmall() && a.getMedium() == b.getMedium()
                && a.getLarge() == b.getLarge()) {
                    // no point in changing
                    return false;
                }
        }

        // valid change
        return true;
    }

    /**
     * Venue static functions. Used to access the bulk of reservations
     */
    protected static void addReservation(Reservation reserved) {
        reservationList.add(reserved);
    }
    protected static void removeReservation(Reservation reserved) {
        reservationList.remove(reserved);
    }


    /**
     *  All given process commands kept in VenueHire for simplicity.
     * 
     */
    private void processCommand(JSONObject json) {
        switch (json.getString("command")) {

        case "room":
            String venue = json.getString("venue");
            String room = json.getString("room");
            String size = json.getString("size");
            Venue.addRoom(venue, room, size);
            break;

        case "request":
            String id = json.getString("id");
            LocalDate start = LocalDate.parse(json.getString("start"));
            LocalDate end = LocalDate.parse(json.getString("end"));
            int small = json.getInt("small");
            int medium = json.getInt("medium");
            int large = json.getInt("large");

            JSONObject result = null;
            Reservation testOld = null;

            //Sees if Reservation exists already. Will return existing if true
            if ((testOld = VenueHireSystem.findReservation(id)) != null) {
                result = Request.jsonReturnStatus(true, testOld);
            } else {
            // Else will create the new reservation and try to add it.
                Reservation newReservation = new Reservation(id, start, 
                                    end, small, medium, large);
                result = Request.request(newReservation);
            }
            
            // Prints out the result of the request.
            System.out.println(result.toString(2));
            break;

        // Changes oldReservation if given valid inputs
        case "change":
            String existId = json.getString("id");
            LocalDate cStart = LocalDate.parse(json.getString("start"));
            LocalDate cEnd = LocalDate.parse(json.getString("end"));
            int cSmall = json.getInt("small");
            int cMedium = json.getInt("medium");
            int cLarge = json.getInt("large");

            // Creation of new Reservation for change. Not implemented 
            // as yet to be checked.
            // Old reservation nullified
            Reservation oldRes = VenueHireSystem.findReservation(existId);
            if (oldRes == null) {
                JSONObject failResult = Request.jsonReturnStatus(false, null);
                System.out.println(failResult.toString(2));
                break;
            }
            oldRes.id = null;
            Reservation newRes = new Reservation(existId, cStart, 
                                    cEnd, cSmall, cMedium, cLarge);
            JSONObject newResult = null;

            // Checks if change is valid/not the same
            // Reactivates oldRes if found to be invalid. 
            // Nulifies newRes.
            if (VenueHireSystem.checkChange(newRes, oldRes) == false) {
                oldRes.id = existId;
                newRes.id = null;
                newResult = Request.jsonReturnStatus(true, oldRes);
                System.out.println(newResult.toString(2));
                break;
            }
            
            newResult = Request.request(newRes);
            if (newResult.get("status").equals("rejected")) {
                oldRes.id = existId;
                newRes.cancelRes(newRes);
                System.out.println(newResult.toString(2));
            } else {
                oldRes.cancelRes(oldRes);
                System.out.println(newResult.toString(2));
            }
            
            break;

        case "cancel":
        // Cancels Reservation based on id. 
        // Expanded in cancelRes in Reservation class.
            String cancelId = json.getString("id");
            Reservation toRem = findReservation(cancelId);
            if (toRem != null) {
                toRem.cancelRes(toRem);
            }
            break;

        case "list":
            // Returns venue list and sorted reservation data,
            // Expanded in Venue class.
            String venueString = json.getString("venue");
            Venue listVenue = Venue.findVenue(venueString);
            if (listVenue != null) {
                JSONArray listResult = listVenue.getList();
                System.out.println(listResult.toString(2));
            }
            break;
        }
    }

    // Main function left untouched
    public static void main(String[] args) {
        VenueHireSystem system = new VenueHireSystem();

        Scanner sc = new Scanner(System.in);

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (!line.trim().equals("")) {
                JSONObject command = new JSONObject(line);
                system.processCommand(command);
            }
        }
        sc.close();
    }

}
