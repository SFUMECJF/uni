package unsw.dungeon.assets;

import java.io.*;
import javax.sound.sampled.AudioInputStream; 
import javax.sound.sampled.AudioSystem; 
import javax.sound.sampled.Clip;

/**
 * A static class for playing sound clips
 * @author John Dao z5258962
 * @author Minh Pham
 */

public class Sound {
    
    // All sound paths for all possible sounds
    
    public static void playGetTreasure() {
        String soundEffectPath = "sound/treasureCollect.wav";
        playSound(soundEffectPath);
    }
    public static void playGetSword() {
        String soundEffectPath = "sound/swordCollect.wav";
        playSound(soundEffectPath);
    }
    public static void playGetPotion() {
        String soundEffectPath = "sound/potionCollect.wav";
        playSound(soundEffectPath);
    }
    public static void playGetKey() {
        String soundEffectPath = "sound/keyCollect.wav";
        playSound(soundEffectPath);
    }

    public static void playKillEnemy() {
        String soundEffectPath = "sound/killEnemy.wav";
        playSound(soundEffectPath);
    }

    public static void playDoor() {
        String soundEffectPath = "sound/doorChange.wav";
        playSound(soundEffectPath);
    }
    public static void playSwitch() {
        String soundEffectPath = "sound/switchChange.wav";
        playSound(soundEffectPath);
    }

    public static void playBoulderMove() {
        String soundEffectPath = "sound/boulderMove.wav";
        playSound(soundEffectPath);
    }

    public static void playPortalMove() {
        String soundEffectPath = "sound/portalMove.wav";
        playSound(soundEffectPath);
    }

    public static void playWallBump() {
        String soundEffectPath = "sound/wallBump.wav";
        playSound(soundEffectPath);
    }

    
    /**
     * Plays a sound based on the path given
     * @param path path where wav file is stored
     */
    private static void playSound(String path) {
        try {
            AudioInputStream inputStream = AudioSystem.getAudioInputStream(new File(path).getAbsoluteFile()); 
            Clip clip = AudioSystem.getClip(); 
            clip.open(inputStream);
            clip.start();
        } catch (Exception e) {
            System.out.println(e);
        }   
    }
}