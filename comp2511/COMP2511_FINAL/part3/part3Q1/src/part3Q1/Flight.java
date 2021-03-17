package part3Q1;

import java.sql.Time;
import java.util.ArrayList;

import java.util.Date;

/**
 * This class assumes that a flight will
 * - Have a departure and arrival time/date
 * - Have a number of seats in several sections
 * - 
 */
public class Flight {
    // flight can have a code/name
    private String name;

    // flight can have a list of bookings scheduled
    private ArrayList<Booking> bookings;

    // flight can have departure and arrival time/date
    // declared this way so that these can be easily changable as
    // flights can be changed/delayed
    private Date departureDate;
    private Time departureTime;

    private Date arrivalDate;
    private Time arrivalTime;

    /**
     * A flight can have
     * @param first class seats avaliable
     * @param business class seats avaliable
     * @param economy class seats avaliable
     * These classes can also be added into as a strategy pattern 
     * if seat rows and etc are implemented 
     * however for simplicity, they are kept as int for avaliable seats
     * 
     * @param departure is the date/time that the flight will be departing. 
     *                      Separated date and time for easily change
     * @param arrival  is the date/time that the flight will be arriving. 
     *                      Separated date and time for easily change
     */
    public Flight(int first, int business, int economy, Date departureDate, Date arrivalDate, Time departureTime, Time arrivalTime) {}

    /**
     * Adds a booking to the list after checking if it is 
     * valid via method check booking
     * Allocates a in appropriate class for the passenger
     * 
     * @return boolean to see if it has successfully been added
     */
    public boolean addBooking(Booking booking) {}

    /**
     * changes a booking to the list after checking if it is 
     * valid via method check booking
     * changes to the appropriate class for the passenger
     * removes oldBooking
     * @return boolean to see if it has successfully been chaned
     */
    public boolean changeBooking(Booking oldBooking, Booking newBooking) {}

    /**
     * removes a given booking within the list of bookings
     * reopens the seat for another passanger to book
     */
    public boolean removeBooking(Booking booking) {}

    /**
     * Checks if a given booking is able to be booked in this flight
     * -Checks if seat is avaliable in appropriate booking class
     */
    public boolean checkBooking(Booking booking) {}
}