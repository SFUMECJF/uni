package unsw.dungeon;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class DungeonApplication extends Application {

    public Scene mainMenu;

    public static void main(String[] args) {
        launch(args);
    }

    // Main Menu screen
    public Scene createMainMenu(Stage primaryStage) throws IOException {

        // Loading the View and creates the screne
        FXMLLoader loader = new FXMLLoader(getClass().getResource("controller/view/MainMenuView.fxml"));
        Parent root = loader.load();
        mainMenu = new Scene(root);

        return mainMenu;
    }

    @Override
    public void start(Stage primaryStage) throws IOException {
        primaryStage.setTitle("Dungeon Master");

        mainMenu = createMainMenu(primaryStage);
        primaryStage.setScene(mainMenu);
        primaryStage.show();
    }

}
