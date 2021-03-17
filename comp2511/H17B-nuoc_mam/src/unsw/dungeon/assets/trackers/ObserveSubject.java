package unsw.dungeon.assets.trackers;

/**
 * Interface for observedsubject
 *
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public interface ObserveSubject {
    
    public void attach(MovementObserver o);
	public void detach(MovementObserver o);
	public void notifyObservers();
}