package unsw.dungeon.controller;

import java.io.File;
import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundRepeat;
import javafx.scene.layout.BackgroundSize;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;

import unsw.dungeon.loader.*;

public class LevelSelectController {
    
    private FXMLLoader tutorialScene;
    private FXMLLoader levelOneScene;
    private FXMLLoader levelTwoScene;
    private FXMLLoader levelThreeScene;

    @FXML
    private Button tutorialBtn;

    @FXML
    private Button levelOneBtn;

    @FXML
    private Button levelTwoBtn;

    @FXML
    private Button levelThreeBtn;

    @FXML
    private Button backBtn;

    @FXML
    private VBox levelSelectVbox;

    public LevelSelectController() {
        this.tutorialScene = null;
        this.levelOneScene = null;
        this.levelTwoScene = null;
        this.levelThreeScene = null;
    }

    /**
     * given a string for a particular level it will create the level and run 
     * a new instance of it
     * @param level is the given string for level
     * @throws IOException In case of failed open
     */
    public void createLevel(String level) throws IOException {
        System.out.println("You pressed a button!");
        DungeonControllerLoader dungeonLoader = new DungeonControllerLoader(level + ".json");
        DungeonController controller = dungeonLoader.loadController();
        
        FXMLLoader loader = new FXMLLoader(getClass().getResource("view/" + level + "View.fxml"));
        loader.setController(controller);

        switch(level) {
            case "tutorial":
                this.tutorialScene = loader;
                break;
            case "level1":
                this.levelOneScene = loader;
                break;
            case "level2":
                this.levelTwoScene = loader;
                break;
            case "level3":
                this.levelThreeScene = loader;
                break;
        }
    }

    @FXML
    public void initialize() {

        BackgroundImage background = new BackgroundImage(new Image((new File("images/bg/levelSelectBG.png")).toURI().toString()),
            BackgroundRepeat.NO_REPEAT, null, null, BackgroundSize.DEFAULT);
        
        levelSelectVbox.setBackground(new Background(background));
    }

    @FXML
    // button to run tutorial
    public void handleOnTutorial(ActionEvent clicked) throws IOException{
        tutorialBtn.getScene().getWindow().hide();
        createLevel("tutorial");
        Parent root = tutorialScene.load();
        Stage stage = new Stage();
        stage.initOwner(tutorialBtn.getScene().getWindow());
        stage.setScene(new Scene(root));
        root.requestFocus();
        stage.show();
    }

    @FXML
    // button to level 1
    public void handleOnLevelOne(ActionEvent clicked) throws IOException{
        tutorialBtn.getScene().getWindow().hide();
        createLevel("level1");
        Parent root = levelOneScene.load();
        Stage stage = new Stage();
        stage.initOwner(levelOneBtn.getScene().getWindow());
        stage.setScene(new Scene(root));
        root.requestFocus();
        stage.show();
    }

    @FXML
    // button to level 2
    public void handleOnLevelTwo(ActionEvent clicked) throws IOException{
        tutorialBtn.getScene().getWindow().hide();
        createLevel("level2");
        Parent root = levelTwoScene.load();
        Stage stage = new Stage();
        stage.initOwner(levelTwoBtn.getScene().getWindow());
        stage.setScene(new Scene(root));
        root.requestFocus();
        stage.show();

    }

    @FXML
    // button to level 3
    public void handleOnLevelThree(ActionEvent clicked) throws IOException {
        tutorialBtn.getScene().getWindow().hide();
        createLevel("level3");
        Parent root = levelThreeScene.load();
        Stage stage = new Stage();
        stage.initOwner(levelThreeBtn.getScene().getWindow());
        stage.setScene(new Scene(root));
        root.requestFocus();
        stage.show();

    }

    @FXML
    // back button
    public void handleOnBack(ActionEvent clicked) throws IOException{
        tutorialBtn.getScene().getWindow().hide();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("view/MainMenuView.fxml"));  
        Stage stage = new Stage();
        stage.initOwner(backBtn.getScene().getWindow());
        stage.setScene(new Scene((Parent) loader.load()));
        stage.show();
    }

}