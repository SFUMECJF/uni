package part3Q1;

/**
 * Assumes each booking will have 
 * - a seat class
 * 
 */
public class Booking {
    // booking can have a seatClass
    private String bookedClass;

    // booking can be associated with a flight
    private Flight flight;

    // constructor for booking. Booking can have a 
    // - class for its class seat
    // - an associated flight for the booking
    public Booking(String bookedClass, Flight flight) {}

    // gets the seatClass of the current booking
    public String getSeatClass() {}

    
}