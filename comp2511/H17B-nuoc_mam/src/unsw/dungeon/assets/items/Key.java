package unsw.dungeon.assets.items;

import unsw.dungeon.assets.*;

/**
 * An entity for key in dungeon
 * 
 * Is an object that makes sounds
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Key extends Entity implements SoundEntity{
    private int keyID;

    public Key(int x, int y, int id) {
        super(x, y);
        this.keyID = id;
        this.setimagepath("images/key.png");
    }

    // returns keyID associated with key
    public int getKeyID() {
        return keyID;
    }
    
    // plays sound of the key being collected
    @Override
    public void playSound() {
        Sound.playGetKey();
    }
    
}