/**
 *
 */
package unsw.automata;

import java.util.ArrayList;
import java.util.List;
/**
 * All imports as recommended via the preparation
 */

import javafx.beans.property.BooleanProperty;
import javafx.beans.property.SimpleBooleanProperty;


/**
 * Conway's Game of Life on a 10x10 grid.
 *
 * @author Robert Clifton-Everest
 *
 */
public class GameOfLife {

    private BooleanProperty gridPane[][];

    public GameOfLife() {
        // TODO At the start all cells are dead
        this.gridPane = new BooleanProperty[10][10];

        for (int x = 0; x < 10; x++) {
            for (int y = 0; y < 10; y++) {
                this.gridPane[x][y] = new SimpleBooleanProperty(false);
            }
        }
    }

    public BooleanProperty cellProperty(int x, int y) {
		return gridPane[x][y];
    }

    public void ensureAlive(int x, int y) {
        // TODO Set the cell at (x,y) as alive
        this.gridPane[x][y].set(true);
    }

    public void ensureDead(int x, int y) {
        // TODO Set the cell at (x,y) as dead
        this.gridPane[x][y].set(false);;
    }

    public boolean isAlive(int x, int y) {
        // TODO Return true if the cell is alive
        return gridPane[x][y].get();
    }

    // Finds all neighbours based on location given in int x and y
    private ArrayList<Grid> findNeighbours(int x, int y) {
        ArrayList<Grid> neighbours = new ArrayList<Grid>();
		for (int i = -1; i < 2; i++) {
			for (int j = -1; j < 2; j++) {
                // ignore same coordinate
				if (i == 0 && j == 0) {
					continue;
                } else {
                    // add neighbour
                    System.out.println("added " + (x + i) + (y + j) + " for coordinate " + x + y);
                    neighbours.add(new Grid(Grid.div(x + i) , Grid.div(y + j)));
                }
			}
		}
		return neighbours;
    }

    // isalive to check given gridPane
    private static boolean iscurrentAlive(BooleanProperty transition[][], int x, int y) {
        if (x >= 0 && x < 10 && y >= 0 && y < 10) { 
            return transition[x][y].get();
        } else {
            return false;
        }
            
    }

    public void tick() {
        // TODO Transition the game to the next generation.
        BooleanProperty transition[][] = new BooleanProperty[10][10];

        // Copy over current state;

        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j ++) {
                if (isAlive(i, j)){
                    transition[i][j] = new SimpleBooleanProperty(true);
                } else {
                    transition[i][j] = new SimpleBooleanProperty(false);
                }
            }
        }
        
        // set appropriate grids in gridplane as dead/alive depending on
        // state of all alive neighbours
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                int aliveNeighbours = (int) findNeighbours(i, j).stream().filter(grid -> iscurrentAlive(transition, grid.x, grid.y)).count();
				if (isAlive(i, j)) {
                    if (aliveNeighbours == 2 || aliveNeighbours == 3) {
                        ensureAlive(i, j);
                    } else {
                        ensureDead(i, j);
                    }
				} else {
                    // dead cell with 3 neighbours
					if (aliveNeighbours == 3) {
						ensureAlive(i, j);
					} else {
                        //ensure its dead
						ensureDead(i, j);
					}
				}
            }
        }
    }   

}

class Grid {
    public int x;
    public int y;

    public Grid(int x, int y) {
        this.x = x;
        this.y = y;
    }

    // simple divide by 10 (grid size). Returns remainder when divided into x
    public static int div(int x) {
        return ((x + 10) % 10);
    }
}
