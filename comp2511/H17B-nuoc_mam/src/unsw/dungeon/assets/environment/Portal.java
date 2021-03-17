package unsw.dungeon.assets.environment;

import unsw.dungeon.assets.*;

/**
 * Portal class. Holds all functions for the portal entity
 * 
 * Is an object that makes sounds
 * 
 * @author John Dao z5258962
 * @author Minh Pham
 */

public class Portal extends Entity implements SoundEntity{

    public Portal cPortal;

    /**
     * standard constructor
     * @param x x coord of portal
     * @param y y coord of portal
     */
    public Portal(int x, int y) {
        super(x, y);
        this.cPortal = null;
        this.setimagepath("images/portal.png");
    }

    /**
     * Sets cooresponding portal for easy access both ways ;)
     * @param cPortal corresponding portal that teleports player to
     */
    public void setcPortal(Portal cPortal) {
        this.cPortal = cPortal;
        cPortal.cPortal = this;
    }

    // plays sound for portal teleport
    @Override
    public void playSound() {
        Sound.playPortalMove();
    }
}