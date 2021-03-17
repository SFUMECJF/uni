package unsw.dungeon.console;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.swing.*;
import javax.swing.text.*;
import java.awt.*;
import java.awt.event.*;

import unsw.dungeon.assets.*;

/**
 * Simple swing console made to accomodate the cheat/debug console
 * @author John Dao z5258962
 * @author Minh Pham
 */
public class DebugConsole {

    // Swing static declarations
    public static JTextArea output;
    public static JTextField input;
    public static JFrame consoleFrame;
    public static JPanel panel;
    public static String testString = "test";
    public static String ENTER = "RUN";
    public static JButton runJButton;

    // debug commands
    public static DebugCommands commands;
    
    // tests to see if program is already running. Will open if not. vice versa
    static final AtomicBoolean running = new AtomicBoolean();
    public static void testRunning() {
        if (!running.compareAndSet(false, true) && consoleFrame != null) {
            consoleFrame.dispose();
            running.set(false);
        } else {
            main(null);
        }
    }

    public static void killRunning() {
        if (!running.compareAndSet(false, true) && consoleFrame != null) {
            consoleFrame.dispose();
            running.set(false);
        }
    }

    // main function start command
    public static void main(String [] args) {
        commands = new DebugCommands();
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        createFrame();
    }

    // Creates frame for user to use console
    public static void createFrame() {
        // Creates frame and panel for console
        consoleFrame = new JFrame("Debug Console");
        consoleFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));

        // adds listener to see if the window has been closed
        consoleFrame.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                running.set(false);
            }
        });
        
        // Button to run 
        ButtonListener runButton = new ButtonListener();
        output = new JTextArea(10, 60);
        output.setWrapStyleWord(true);
        output.setEditable(false);

        // Creates input panel and text field
        JPanel inputpanel = new JPanel();
        inputpanel.setLayout(new FlowLayout());
        input = new JTextField(20);

        // Sets action of button to run
        runJButton = new JButton("RUN");
        runJButton.setActionCommand(ENTER);
        runJButton.addActionListener(runButton);
        input.setActionCommand(ENTER);
        input.addActionListener(runButton);

        // Scroll up/down to see history
        JScrollPane scroll = new JScrollPane(output);
        scroll.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
        scroll.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        
        // set update
        DefaultCaret caret = (DefaultCaret) output.getCaret();
        caret.setUpdatePolicy(DefaultCaret.ALWAYS_UPDATE);
        panel.add(scroll);
        inputpanel.add(input);
        inputpanel.add(runJButton);
        panel.add(inputpanel);
        
        // set frame and settings.
        consoleFrame.getContentPane().add(BorderLayout.CENTER, panel);
        consoleFrame.pack();
        consoleFrame.setLocationByPlatform(true);
        consoleFrame.setResizable(false);
        consoleFrame.setVisible(true);
        input.requestFocus();
        output.append("run 'help' to get all commands\n");
    }

    // method that enables for the input of user to be run when 
    // button is pressed
    public static class ButtonListener implements ActionListener {

        // runs requested actions by getting input command and passing it
        // through the console's commands
        public void actionPerformed(final ActionEvent ev) {
            if (!input.getText().trim().equals("")) {
                String command = ev.getActionCommand();
                if (ENTER.equals(command)) {
                    
                    output.append(commands.filterCommand(input.getText()) + "\n");
                }
            }

            // Empty text box
            input.setText("");
            input.requestFocus();
        }
    }

    // sets dungeon to be accessed via the commands
    public static void setDungeon(Dungeon setDungeon) {
        commands.setDungeon(setDungeon);
    }
}