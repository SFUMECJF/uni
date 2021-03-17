package unsw.dungeon.assets.environment;

import unsw.dungeon.assets.*;

/**
 * An entity for the wall in the dungeon
 * 
 * Is an object that makes sounds
 * 
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Wall extends Entity implements SoundEntity{

    public Wall(int x, int y) {
        super(x, y);
        this.setimagepath("images/brick_brown_0.png");
    }

    // plays sound of the player bumping into wall
    @Override
    public void playSound() {
        Sound.playWallBump();
    }
}
