package unsw.dungeon.controller;

import java.io.File;
import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundRepeat;
import javafx.scene.layout.BackgroundSize;
import javafx.scene.layout.VBox;

import unsw.dungeon.console.*;

import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

public class EndGameController {
    String path = "images/bg/winBg.png";

    public EndGameController(Boolean win) {
        if (!win) {
            path = "images/bg/loseBg.png";
        }
    }
    @FXML
    private Button backBtn;

    @FXML
    private VBox winScreenVBox;

    @FXML
    public void initialize() {

        BackgroundImage background = new BackgroundImage(new Image((new File(path)).toURI().toString()),
            BackgroundRepeat.NO_REPEAT, null, null, BackgroundSize.DEFAULT);
        
        winScreenVBox.setBackground(new Background(background));
    }

    @FXML
    public void handleOnBackBtn(ActionEvent clicked) throws IOException{
        
        backBtn.getScene().getWindow().hide();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("view/LevelSelectView.fxml"));  
        Stage stage = new Stage();
        stage.initOwner(backBtn.getScene().getWindow());
        stage.setScene(new Scene((Parent) loader.load()));
        stage.show();
    }

}