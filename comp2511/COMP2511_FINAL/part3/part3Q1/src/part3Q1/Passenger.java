package part3Q1;

import java.util.ArrayList;

/**
 * This class assumesthat passangers can have
 * - More than one flight in their schedule
 * - Each flight having allocated seating with appropriate classes
 */
public class Passenger implements Schedule {

    // Passenger can have an array of bookings to their own discression
    // This means that this list can have overlapping bookings as the passanger
    // must plan appropriately with different flights
    private ArrayList<Booking> schedule;

    // assumes passenger can have
    public Passenger() {}
    
    /**
     * creates a booking and adds its to the passenger's list of bookings
     * @param flight flight to be added to flightBooked if 
     *              checkBooking for seatclass is ok
     * Booking is added if booking is ok
     */
    @Override
    public void addFlight(Flight flight, String seatClass) {
    }

    /**
     * updates a booking with a new type of booking
     */
    @Override
    public void updateFlight(Flight flight, Booking oldBooking, Booking newBooking) {}

    /**
     * removes the flight from the passangers schedule and removes it from the 
     * flight's bookings
     */
    @Override
    public void cancelFlight(Flight flight, Booking booking) {}
}