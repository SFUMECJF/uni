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

public class MainMenuController {
    

    @FXML
    private Button playGameBtn;

    @FXML
    private Button settingsBtn;

    @FXML
    private VBox mainMenuVBox;

    public MainMenuController() {
    }

    @FXML
    public void initialize() {

        BackgroundImage background = new BackgroundImage(new Image((new File("images/bg/mainMenuBG.png")).toURI().toString()),
            BackgroundRepeat.NO_REPEAT, null, null, BackgroundSize.DEFAULT);
        
        mainMenuVBox.setBackground(new Background(background));
    }

    @FXML
    public void handleOnPlay(ActionEvent clicked) throws IOException{
        playGameBtn.getScene().getWindow().hide();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("view/LevelSelectView.fxml"));  
        Stage stage = new Stage();
        stage.initOwner(playGameBtn.getScene().getWindow());
        stage.setScene(new Scene((Parent) loader.load()));
        stage.showAndWait();
    }

    @FXML
    public void handleOnSettings(ActionEvent clicked) {
        System.out.println("Settings button has been pressed");
    }

    @FXML
    public void handleOnBack(ActionEvent clicked) throws IOException{
        // close the window
        playGameBtn.getScene().getWindow().hide();

    }
}