package unsw.dungeon.assets.environment;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.player.*;
import unsw.dungeon.assets.trackers.*;

/**
 * An entity for the Enemy in the dungeon
 * 
 * Is a movable object that makes sounds and is observed
 * @author John Dao z5258962
 * @author Minh Pham 
 */

public class Enemy extends Entity implements MovementObserver, SoundEntity{

    
    public Enemy(Dungeon dungeon, int x, int y) {
        super(x, y);
        this.movable = new Movable(this, dungeon);
        this.setimagepath("images/deep_elf_master_archer.png");
    }

    /**
     * Calls moveEntity command if entity is movable.
     * 
     * @param x int to move entity by x axis
     * @param y int to move entity by y axis
     */
    public void move(int x, int y) {
        movable.moveEntity(x, y);

    }

    public void updateEnemyPosition(Player player, int x, int y) {

        // distance in X-axis and Y-axis of Player and Enemy
        int xDist = player.getX() - this.getX();
        int yDist = player.getY() - this.getY();

        // determining which axis has the greatest distance
        // if axisDist > 0, it means hunter should move either LEFT or RIGHT depending on xDist being positive or negative
        int axisDist = Math.abs(xDist) - Math.abs(yDist);


        // move LEFT
        if (axisDist > 0 && xDist < 0) {
            if (player.getInvincibilityState()) {
                move(1, 0);
            } else {
                move(-1, 0);
            }
                
        // move RIGHT
        } else if (axisDist > 0) {
            if (player.getInvincibilityState()) {
                move(-1, 0);
            } else {
                move(1, 0);
            }
        
        // move UP
        } else if (axisDist < 0 && yDist < 0) {
            if (player.getInvincibilityState()) {
                move(0, 1);
            } else {
                move(0, -1);
            }
            
        // move DOWN
        } else if (axisDist < 0 && yDist > 0) {
            if (player.getInvincibilityState()) {
                move(0, -1);
            } else {
                move(0, 1);
            }
            

        // equal distance apart
        } else { // axisDist = 0
            int random = Math.random() > 0.5 ? 1 : 0; // randomly generates 1 or 0
            
            // move UP or LEFT
            if (xDist < 0 && yDist < 0) {
                if (random == 1) {
                    if (player.getInvincibilityState()) {
                        move(0, 1);
                    } else {
                        move(0, -1);
                    }
                } else {
                    if (player.getInvincibilityState()) {
                        move(1, 0);
                    } else {
                        move(-1, 0);
                    }
                }
            
            // move DOWN or RIGHT
            } else if (xDist > 0 && yDist > 0) {
                if (random == 1) {
                    if (player.getInvincibilityState()) {
                        move(0, -1);
                    } else {
                        move(0, 1);
                    }
                } else {
                    if (player.getInvincibilityState()) {
                        move(-1, 0);
                    } else {
                        move(1, 0);
                    }
                }
                
            // move DOWN or LEFT
            } else if (xDist < 0 && yDist > 0) {
                if (random == 1) {
                    if (player.getInvincibilityState()) {
                        move(0, -1);
                    } else {
                        move(0, 1);
                    }
                } else {
                    if (player.getInvincibilityState()) {
                        move(1, 0);
                    } else {
                        move(-1, 0);
                    }
                }
            
            // move UP or RIGHT
            } else if (xDist > 0 && yDist < 0) {
                if (random == 1) {
                    if (player.getInvincibilityState()) {
                        move(0, 1);
                    } else {
                        move(0, -1);
                    }
                } else {
                    if (player.getInvincibilityState()) {
                        move(-1, 0);
                    } else {
                        move(1, 0);
                    }
                }
            }
        }
    }


    @Override
    public void update(ObserveSubject obj) {

        if (obj instanceof Player) {
            Player player = (Player) obj;
            updateEnemyPosition(player, player.getX(), player.getY());  
        }

    }
    
    @Override
    public void playSound() {
        Sound.playKillEnemy();
    }
}
