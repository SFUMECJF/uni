package unsw.automata;

import javafx.fxml.FXML;
import javafx.geometry.Pos;

/**
 * All imports as recommended via the preparation
 */

import javafx.util.Duration;
import javafx.scene.layout.Pane;
import javafx.beans.property.BooleanProperty;
import javafx.event.ActionEvent;
import javafx.scene.layout.GridPane;
import javafx.scene.control.CheckBox;
import javafx.animation.Timeline;
import javafx.animation.KeyFrame;
import javafx.scene.control.Button;
import javafx.scene.input.MouseEvent;

/**
 * A JavaFX controller for the Conway's Game of Live Application.
 *
 * @author Robert Clifton-Everest
 *
 */
public class GameOfLifeController {
    /**
     * All declarations for the variables in the view
     * Self explanitory
     */

    @FXML
    private GridPane playGrid;

    @FXML
    private Pane pane;

    @FXML
    private Button start;

    @FXML
    private Button tick;

    

    private Timeline gameTimeline;
    private GameOfLife newGame;

    /**
     * GameofLifeController constructor
     */
    public GameOfLifeController() {
        // set the variables needed for the game
        newGame = new GameOfLife();
        gameTimeline = new Timeline(new KeyFrame(Duration.millis(500), e -> 
                            {newGame.tick();}));
        gameTimeline.setCycleCount(Timeline.INDEFINITE);
        
    }

    // Handles game start button event
    @FXML
    public void handlerStart(ActionEvent event) {
        gameTimeline.play();
    }

    @FXML
    public void handlerStop(ActionEvent event) {
        gameTimeline.stop();
    }
    // handles game tick button event
    @FXML
    public void handlerTick(ActionEvent event) {
        newGame.tick();
    }
    
    @FXML 
    public void initialize() {
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                // Create new checkbox, and place it in grid
                CheckBox newBox = new CheckBox();
                newBox.setAlignment(Pos.CENTER);
                newBox.selectedProperty().bindBidirectional(newGame.cellProperty(i, j));
                playGrid.add(newBox, i, j);
            }
        }
    }
}

