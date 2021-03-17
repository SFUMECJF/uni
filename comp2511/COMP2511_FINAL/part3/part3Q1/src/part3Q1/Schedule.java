package part3Q1;

import java.util.ArrayList;

/**
 * This class assumes a schedule can
 * - Add, change or remove flights
 * - Have more than one flight with allocated seats
 */
public interface Schedule {

    // adds a flight to the schedule
    public void addFlight(Flight flight, String seatClass);

    // changes a flight with the new booking booking.
    public void updateFlight(Flight flight, Booking booking , Booking newBooking);

    // removes the flight from the schedule
    public void cancelFlight(Flight flight, Booking booking);

}