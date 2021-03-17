/**
 *
 */
package unsw.dungeon.assets;

import java.util.ArrayList;
import java.util.List;
import javafx.collections.ListChangeListener;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import unsw.dungeon.assets.environment.*;
import unsw.dungeon.assets.player.*;
import unsw.dungeon.assets.trackers.*;

/**
 * A dungeon in the interactive dungeon player.
 *
 * A dungeon can contain many entities, each occupy a square. More than one
 * entity can occupy the same square.
 *
 * @author Robert Clifton-Everest
 * @author John Dao z5258962
 * @author Minh Pham
 *
 */
public class Dungeon {

    private int width, height;
    private ObservableList<Entity> entities;
    private int numEntities;
    private Player player;
    private Goal goal; // if goal is null, then its just an exit.

    public Dungeon(int width, int height) {
        this.width = width;
        this.height = height;
        this.entities = FXCollections.observableList(new ArrayList<>());
        this.numEntities = 0;
        trackEntities();
        this.player = null;
        this.goal = null;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public Player getPlayer() {
        return player;
    }

    public int getNumEntities() {
        return this.numEntities;
    }

    public Goal getGoals() {
        return this.goal;
    }

    public Dungeon getDungeon() {
        return this;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    /**
     * adds entity to the list and THEN INCREMENTS the total entity count
     * @param entity
     */
    public void addEntity(Entity entity) {
        entities.add(entity);
        numEntities++;
    }

    /**
     * removes entities from the list and THEN deincrements the total entity count
     * @param e
     */
    public void removeEntity(Entity e) {
        if (e instanceof SoundEntity) {
            SoundEntity soundEntity = (SoundEntity) e;
            soundEntity.playSound();
            e = (Entity) e;
        }

        e.removeView();
        entities.remove(e);
        numEntities--;
    }

    //Only changes goal if main goal is not going through door OR has subgoals
    public void setGoals(Goal goal) {
        this.goal = goal;
    }

    /**
     * Checks if goal with substring exists and if it does, completes it
     * @param subGoal the goal to be checked
     */
    public void checkGoal(String subGoal) {
        boolean completed = getGoals().checkGoal(subGoal);
        if (!completed) {
            System.out.println("GOAL NOT FOUND");
        }
    }
    

    /**
     * Checks if move is ok and returns the collision entity if it can collide
     * Gets all entities in coordinates via getEntity and passes it 
     * through loop to check if it is a valid collision
     * @param x int to move entity by x axis
     * @param y int to move entity by y axis
     * @return returns collision entity if it is detected in the arraylist
     */
    public Entity getCollision(int x, int y) { 
        List<Entity> compareList = getEntity(x, y);
        if (compareList == null)  {
            return null;
        }

        for (Entity compare : compareList) {
            // Stop if collision is detected with wall or boulder
            if (compare instanceof Wall || compare instanceof Boulder) {
                return compare;
            } else if (compare instanceof Door) {
                Door compareDoor = (Door)compare;
                // Only stop if collision is detected on door
                if (compareDoor.isLocked()) {
                    return compareDoor;
                }
            } else if (compare instanceof Exit || compare instanceof Portal || compare instanceof Enemy) {
                return compare;
            }
        }
        return null;
    }

    /**
     * Gets entity in given x and y coordinates via for loop
     * @param x x coordinate to be checked
     * @param y y coordinate to be checked
     * @return Arraylist of entities in given coordinates
     */
    public List<Entity> getEntity(int x, int y) {

        List<Entity> foundEntities = new ArrayList<>();

        for (Entity e : entities) {

            if (e.getX() == x && e.getY() == y) {
                foundEntities.add(e);
            }
        }
        
        if (foundEntities.size() == 0) {
            return null;
        } else {
            return foundEntities;
        }   
    }

    /**
     * Checks to see if the given entity exists within dungeon entities
     * @param e entity to be checked within dungeon
     * @return boolean true if exists. else false
     */
    public boolean entityExists(Entity e) {
        return entities.contains(e);
    }

    /**
     * Method to remove enemy from the dungeon
     * Also rechecks to see if the goal "enemies" has been completed
     * @param enemy entity enemy to be killed
     */
    public void killEnemy(Enemy enemy) {
        for (Entity e : entities) {
            if (e.equals(enemy)) {
                Enemy toRemove = (Enemy) e;
                MovementObserver obs = (MovementObserver) toRemove;
                player.detach(obs);
                this.removeEntity(enemy);
                break;
            }
        }
        updateGoalStatus();
    }

    /**
     * Method to return a list of the all entities on the dungeon
     * 
     * @return entities of type List<Entity>
     */
    public ObservableList<Entity> getAllEntities() {
        return this.entities;
    }

    /**
     * checks to see if any goal has been completed
     */
    public void updateGoalStatus() {
        EntityTracker.checkChange(getAllEntities(), getDungeon());
    }
    
    // Adds a listener to track any possible changes to the entities array
    // Cannot be triggered when things are being added onto the array!!!
    public void trackEntities() {
        getAllEntities().addListener(new ListChangeListener<Entity>() {
            
            @Override
            public void onChanged(ListChangeListener.Change<? extends Entity> change) {
                if (getNumEntities() > getAllEntities().size()) {
                    System.out.println("ENTITY REMOVED");
                    EntityTracker.checkChange(getAllEntities(), getDungeon());
                }  
            }
        });
    }

    
}
