package unsw.dungeon.assets;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.StringProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.scene.image.ImageView;

/**
 * An entity in the dungeon.
 * Root entity :)
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Entity {

    // IntegerProperty is used so that changes to the entities position can be
    // externally observed.
    private IntegerProperty x, y;
    
    private StringProperty imagePath;
    private ImageView view;

    // movable is the modifier for entity to determine if it is movable.
    // Null is immovable.

    protected Movable movable;

    /**
     * Create an entity positioned in square (x,y)
     * @param x
     * @param y
     */
    public Entity(int x, int y) {
        this.x = new SimpleIntegerProperty(x);
        this.y = new SimpleIntegerProperty(y);
        this.movable = null;
        this.imagePath = new SimpleStringProperty();
        this.view = null;
    }

    public IntegerProperty x() {
        return x;
    }

    public IntegerProperty y() {
        return y;
    }

    public int getY() {
        return y().get();
    }

    public int getX() {
        return x().get();
    }

    /**
     * Functions below allow for access to image path to set and get
     * @param imagePath the path of the image from home directory
     */
    
    public void setimagepath(String imagePath) {
        this.imagePath.set(imagePath);
    }

    public String getimagePath() {
        return this.imagePath.get();
    }

    public StringProperty imagePath() {
        return imagePath;
    }

    /**
     * Functions to store Imageview for direct removal or alteration
     * @param view
     */
    public ImageView getView() {
        return view;
    }

    public void setView(ImageView node) {
        this.view = node;
    }

    public void removeView() {
        this.getView().setImage(null);
    }
}
