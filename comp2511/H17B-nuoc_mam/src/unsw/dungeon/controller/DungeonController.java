package unsw.dungeon.controller;

import java.util.ArrayList;
import java.util.List;
import java.io.File;
import java.io.IOException;

import javafx.beans.value.ChangeListener;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.GridPane;

import unsw.dungeon.assets.*;
import unsw.dungeon.assets.player.*;
import unsw.dungeon.console.*;
import javafx.beans.value.*;
import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

/**
 * A JavaFX controller for the dungeon.
 * @author Robert Clifton-Everest
 *
 */
public class DungeonController {

    @FXML
    private GridPane squares;

    @FXML
    private Button backBtn;

    @FXML
    private Label treasureLbl;

    @FXML
    private Label swordLbl;

    @FXML
    private Label keysLbl;

    @FXML
    private Label statusLbl;
    
    private List<ImageView> initialEntities;

    private Player player;

    private Goal goal;
    
    private Dungeon dungeon;

    public DungeonController(Dungeon dungeon, List<ImageView> initialEntities) {
        this.dungeon = dungeon;
        this.player = dungeon.getPlayer();
        this.goal = dungeon.getGoals();
        this.initialEntities = new ArrayList<>(initialEntities);
        trackGoalStatus();
        trackPlayerStatus();
        trackplayerItems();
    }

    public void trackGoalStatus() {
        getGoal().getMainGoal().addListener(new ChangeListener<Boolean>() {
            
            @Override
            public void changed(ObservableValue<? extends Boolean> observable,
            Boolean oldValue, Boolean newValue) {
                if (getGoal().getMainGoal().get()) {
                    System.out.println("FINISHED DUNGEON");
                    DebugConsole.killRunning();
                    backBtn.getScene().getWindow().hide();
                    try {
                        handleWinLose(true);
                    } catch (IOException e) {
                        System.out.println(e);
                    }
                }
            }
        });
    }

    public void trackPlayerStatus() {
        player.getAliveStatus().addListener(new ChangeListener<Boolean>() {
            
            @Override
            public void changed(ObservableValue<? extends Boolean> observable,
            Boolean oldValue, Boolean newValue) {
                if (!player.getAliveStatus().get()) {
                    System.out.println("PLAYER DIED");
                    DebugConsole.killRunning();
                    backBtn.getScene().getWindow().hide();
                    try {
                        handleWinLose(false);
                    } catch (IOException e) {
                        System.out.println(e);
                    }
                }
            }
        });
    }

    public void handleWinLose(boolean win) throws IOException{
        EndGameController controller = new EndGameController(win);
        FXMLLoader loader = new FXMLLoader(getClass().getResource("view/WinView.fxml"));  
        loader.setController(controller);
        
        Parent root = loader.load();
        Stage stage = new Stage();
        stage.initOwner(backBtn.getScene().getWindow());
        stage.setScene(new Scene(root));
        root.requestFocus();
        stage.show();
    }

    public void trackplayerItems() {
        player.getInventory().countTreasureSize().addListener(new ChangeListener<Number>() {
            
            @Override
            public void changed(ObservableValue<? extends Number> observable,
            Number oldValue, Number newValue) {
                System.out.println("TREASURE NUMBER HAS INCREASED TRACKER!!!");
                
                treasureLbl.textProperty().bind(player.getInventory().countTreasureSize().asString());
            }
        });
        player.getInventory().getSword().getTrackDurability().addListener(new ChangeListener<Number>() {
            
            @Override
            public void changed(ObservableValue<? extends Number> observable,
            Number oldValue, Number newValue) {
                System.out.println("SWORD DURABILITY IS" + player.getInventory().getSword().getDurability());
                swordLbl.textProperty().bind(player.getInventory().getSword().getTrackDurability().asString());
            }
        });
    }

    public Dungeon getDungeon() {
        return this.dungeon;
    }
    
    public Goal getGoal() {
        return this.goal;
    }
    
    @FXML
    public void initialize() {
        Image ground = new Image((new File("images/dirt_0_new.png")).toURI().toString());

        // Add the ground first so it is below all other entities
        for (int x = 0; x < dungeon.getWidth(); x++) {
            for (int y = 0; y < dungeon.getHeight(); y++) {
                squares.add(new ImageView(ground), x, y);
            }
        }

        for (ImageView entity : initialEntities)
            squares.getChildren().add(entity);

        

    }

    @FXML
    public void handleKeyPress(KeyEvent event) {
        switch (event.getCode()) {
        case UP:
            System.out.println("KeyPress UP");
            player.move(0, -1);
            break;
        case DOWN:
            System.out.println("KeyPress DOWN");
            player.move(0, 1);
            break;
        case LEFT:
            System.out.println("KeyPress LEFT");
            player.move(-1, 0);
            break;
        case RIGHT:
            System.out.println("KeyPress RIGHT");
            player.move(1, 0);
            break;
        case ESCAPE:
            // opens debugging console with esc button. will close window if opened
            DebugConsole.testRunning();
            DebugConsole.setDungeon(dungeon);
            break;
        default:
            break;
        }
    }

    @FXML
    // back button
    public void handleOnBackBtn(ActionEvent clicked) throws IOException {
        DebugConsole.killRunning();
        backBtn.getScene().getWindow().hide();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("view/LevelSelectView.fxml"));  
        Stage stage = new Stage();
        stage.initOwner(backBtn.getScene().getWindow());
        stage.setScene(new Scene((Parent) loader.load()));
        stage.show();
    }
}

