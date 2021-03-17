package unsw.dungeon.assets.player;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;

import java.util.Timer;
import java.util.TimerTask;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.items.*;
import unsw.dungeon.assets.trackers.*;
/**
 * The player entity
 * 
 * Is a movable object
 * 
 * @author John Dao z5258962
 * @author Minh Pham 
 */
public class Player extends Entity implements ObserveSubject {

    private Dungeon dungeon;
    private Movable movable;
    private Inventory inventory;
    private boolean invincibilityState;
    private boolean walkerState;

    CopyOnWriteArrayList<MovementObserver> listOfObservers = new CopyOnWriteArrayList<MovementObserver>();
    public Timer invStatusTimer;
    public BooleanProperty alive;
    /**
     * Create a player positioned in square (x,y)
     * @param x
     * @param y
     */
    public Player(Dungeon dungeon, int x, int y) {
        super(x, y);
        this.dungeon = dungeon;
        this.movable = new Movable(this, dungeon);
        this.setimagepath("images/human_new.png");
        this.inventory = new Inventory();
        this.invincibilityState = false;
        this.walkerState = false;
        this.invStatusTimer = new Timer();
        this.alive = new SimpleBooleanProperty(true);
    }

    public Inventory getInventory() {
        return this.inventory;
    }

    public boolean getInvincibilityState() {
        return this.invincibilityState;
    }

    public boolean getWalkerState() {
        return this.walkerState;
    }

    public void setInvincibilityState(boolean state) {
        this.invincibilityState = state;
        if (state) {
            this.setimagepath("images/human_invincible.png");
        } else {
            this.setimagepath("images/human_new.png");
        }
    }

    public void setWalkerState(boolean state) {
        this.walkerState = state;
        if (state) {
            this.setimagepath("images/human_walker.png");
        } else {
            this.setimagepath("images/human_new.png");
        }
    }

    public BooleanProperty getAliveStatus() {
        return this.alive;
    }

    public void kill() {
        this.alive.set(false);
    }
    /**
     * Calls moveEntity command if entity is movable.
     * 
     * @param x int to move entity by x axis
     * @param y int to move entity by y axis
     */
    public void move(int x, int y) {
        notifyObservers();
        movable.moveEntity(x, y);
    }

    /**
     * Player has just moved onto a new position. This method checks to see
     * if there is anything that can be picked up on this new position
     */
    public void checkCollect() {
        List<Entity> foundEntities = dungeon.getEntity(getX(), getY());

        for (Entity e : foundEntities) {
            if (e instanceof Key) {
                Key key = (Key) e;
                if (inventory.pickUpKey(key)) {
                    dungeon.removeEntity(e);
                }

            } else if (e instanceof Treasure) {
                Treasure treasure = (Treasure) e;
                inventory.addTreasure(treasure);
                dungeon.removeEntity(e);

            } else if (e instanceof Sword) {
                Sword sword = (Sword) e;
                if (inventory.pickUpSword(sword)) {
                    dungeon.removeEntity(e);
                }
            
            } else if (e instanceof Potion) {
                Potion potion = (Potion) e;
                potion.usePotion(this, this.dungeon);
                dungeon.removeEntity(e);
                System.out.println("Player has picked a POTION!");
            }
        }
    }

    /**
     * Sets a timer for the invincibility status for the player
     * @param player
     */
    public synchronized void setStatusTimer(Player player, Potion potion) {
        // Cancels existing timer
        this.invStatusTimer.cancel();

        this.invStatusTimer = new Timer();

        TimerTask changeStatus = new TimerTask() {
            public void run() {
                if (potion instanceof InvincibilityPotion) {
                    System.out.println("INVINCIBILITY POTION ENDED");
                    setInvincibilityState(false);
                } else {
                    setWalkerState(false);
                }
            }
        };
        this.invStatusTimer.schedule(changeStatus, 5000); // will remove effect after 5 seconds
    }

    /**
     * Observer functions for interactions.
     */
    
    @Override
    public void attach(MovementObserver o) {
        if (!listOfObservers.contains(o)) {
            listOfObservers.add(o);
        }
    }

    @Override
    public void detach(MovementObserver o) {
        listOfObservers.remove(o);

    }

    @Override
    public void notifyObservers() {
        for (MovementObserver obs : listOfObservers) {
            obs.update(this);
        }

    }
}
