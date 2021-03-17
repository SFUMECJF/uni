package unsw.dungeon.loader;

import java.io.FileNotFoundException;
import java.io.FileReader;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.util.List;
import java.util.ArrayList;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.environment.*;
import unsw.dungeon.assets.items.*;
import unsw.dungeon.assets.player.*;
import unsw.dungeon.assets.trackers.*;


/**
 * Loads a dungeon from a .json file.
 *
 * By extending this class, a subclass can hook into entity creation. This is
 * useful for creating UI elements with corresponding entities.
 *
 * @author Robert Clifton-Everest
 *
 */
public abstract class DungeonLoader {

    private JSONObject json;

    public DungeonLoader(String filename) throws FileNotFoundException {
        json = new JSONObject(new JSONTokener(new FileReader("dungeons/" + filename)));
    }

    /**
     * Parses the JSON to create a dungeon.
     * @return
     */
    public Dungeon load() {

        // Creates the dungeon dimensions 
        int width = json.getInt("width");
        int height = json.getInt("height");

        Dungeon dungeon = new Dungeon(width, height);

        // Creates the entities that is needed for the dungeon
        JSONArray jsonEntities = json.getJSONArray("entities");

        for (int i = 0; i < jsonEntities.length(); i++) {
            loadEntity(dungeon, jsonEntities.getJSONObject(i));
        }

        // Sets the goal condition of the dungeon
        JSONObject goalCondition = json.getJSONObject("goal-condition");
        String mainGoal = goalCondition.getString("goal");
        
        if (mainGoal.equals("AND")) {   // there exists sub goals
            System.out.println("Sub goals detected. Loading goals");
            loadGoals(dungeon, goalCondition);
            System.out.println("Goals loaded successfully");
        } else {
            System.out.println("No sub goals detected. Only one main goal");
            System.out.println("Loading main goal: " + mainGoal);
            Goal noSubGoals = new Goal(mainGoal, true, null, false); // maybe we can create another constructor for this
            dungeon.setGoals(noSubGoals);
            System.out.println("Goals loaded successfully");

        }

        return dungeon;
    }

    /**
     * Reads through the JSON file to determine what entity it needs to load.
     * 
     * @param dungeon of type Dungeon stores the loaded entities in its List
     * @param json of type JSONObject of the dungeon that is being loaded
     */
    private void loadEntity(Dungeon dungeon, JSONObject json) {
        String type = json.getString("type");
        int x = json.getInt("x");
        int y = json.getInt("y");

        Entity entity = null;
        switch (type) {
        case "player":
            Player player = new Player(dungeon, x, y);
            dungeon.setPlayer(player);
            onLoad(player); // loads the image file onto the entity
            entity = player;
            break;
        case "wall":
            Wall wall = new Wall(x, y);
            onLoad(wall);
            entity = wall;
            break;
        case "treasure":
            Treasure treasure = new Treasure(x, y);
            onLoad(treasure);
            entity = treasure;
            break;
        case "exit":
            Exit exit = new Exit(x, y);
            onLoad(exit);
            entity = exit;
            break;
        case "door":
            int doorID = json.getInt("doorID");
            Door door = new Door(x, y, doorID);
            onLoad(door);
            entity = door;
            break;
        case "key":
            int keyID = json.getInt("keyID");
            Key key = new Key(x, y, keyID);
            onLoad(key);
            entity = key;
            break;
        case "boulder":
            Boulder boulder = new Boulder(dungeon, x, y);
            onLoad(boulder);
            entity = boulder;
            break; 
        case "switch":
            int tX = json.getInt("tX");
            int tY = json.getInt("tY");
            FloorSwitch floorSwitch = new FloorSwitch(dungeon, x, y, tX, tY);
            onLoad(floorSwitch);
            entity = floorSwitch;
            break;          
        case "portal":
            int cX = json.getInt("cX");
            int cY = json.getInt("cY");
            Portal portal = new Portal(x, y);
            Portal cPortal = new Portal(cX, cY);
            portal.setcPortal(cPortal);
            onLoad(portal);
            onLoad(cPortal);
            dungeon.addEntity(cPortal);
            entity = portal;
            break;            
        case "enemy":
            Enemy enemy = new Enemy(dungeon, x, y);
            onLoad(enemy);
            entity = enemy;
            MovementObserver o = enemy;
            dungeon.getPlayer().attach(o);
            break;    
        case "sword":
            Sword sword = new Sword(x, y);
            onLoad(sword);
            entity = sword;
            break;  
        case "invincibility":
            InvincibilityPotion potion = new InvincibilityPotion(x, y);
            onLoad(potion);
            entity = potion;
            break;               
        case "walker" : 
            WalkerPotion potion2 = new WalkerPotion(x, y);
            onLoad(potion2);
            entity = potion2;
            break;
        }
        dungeon.addEntity(entity);
    }

    /**
     * Correction: This method's responsibility is to build a goal when
     * sub goals are found/in the case the goal is AND
     * 
     * Loads goals from a JSONObject and sets it for the dungeon
     * 
     * - dungeons always have a 'goal' but may contain sub goals
     * - sub goals come in the form of array of goals
     * 
     * @param dungeon of type Dungeon of the current dungeon
     * @param json of type JSONObject of the goal conditions that need to be met
     */
    public void loadGoals(Dungeon dungeon, JSONObject json) {
        // Creates inputs for new dungeon goal
        String mainGoal = new String();
        boolean andSubgoalState = false;
        JSONArray allSubGoals = json.getJSONArray("subgoals");

        // gets main goal string. the main goal which CANNOT be OR & AND
        mainGoal = allSubGoals.getJSONObject(0).getString("goal");

        // Checks if the subgoals will be AND or OR. To complete all or only one
        if (allSubGoals.getJSONObject(1).getString("goal") == "AND") {   
            andSubgoalState = true;
        }
        
        System.out.println("Loading main goal: " + mainGoal); // will print OR 

        // parcing json to get all subgoals
        allSubGoals = allSubGoals.getJSONObject(1).getJSONArray("subgoals");
        List<String> subGoalList = new ArrayList<String>();

        for (int i = 0; i < allSubGoals.length(); i++) {
            subGoalList.add(allSubGoals.getJSONObject(i).getString("goal"));
            System.out.println("Adding to subgoal list a subGoal of: " 
                + allSubGoals.getJSONObject(i).getString("goal"));
        }

        // creating goal and linking to dungeon
        Goal goal = new Goal(mainGoal, false, subGoalList, andSubgoalState);
        dungeon.setGoals(goal);
        System.out.println("Goals loaded successfully");
    }

    public abstract void onLoad(Entity entity);

}
