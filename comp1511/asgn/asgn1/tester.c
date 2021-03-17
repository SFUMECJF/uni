
                cancel = 1;
                scanf("%d", &shade);
                if (shade == -1) {
                    shade = 4;
                }
            }
            counter++;
        }
        
        if (input[0] == 4 && cancel == 0) {
            while (counter < 7) {
                global = scanf("%d ", &input[counter]);    
                input[0] = invalid(input[0], input[counter], counter);
                counter++;
            } 
        }

        cancel = 0;
        counter = 0;

        //This set of functions will ensure the start of the row is the smaller
        //number and vice versa.
        start_row = input [1];
        end_row = input[3];
        if (start_row > end_row) {
            larger_row = 1;
        }
        
        start_col = input[2];
        end_col = input[4];
        if (start_col > end_col) {
            larger_col = 1;
        }
        if (input[0] == 1) {
            input[0] = diag_check(start_row, start_col, end_row, end_col);
        }
        //This set of if statements will determine which stage sequence will run
        //based on the user input.
        //
        //Lines & diagonals. 
        //Will print a line between the coordinates given by input (stg 1 & 2)
        if (input[0] == 1) {
            int exit = 0;    
            while (exit == 0) {
                canvas[start_row][start_col] = shade;

                if (start_row > end_row && larger_row == 1) {
                    start_row--;
                } else if (start_row < end_row) {
                    start_row++;
                }
                
                if (start_col > end_col && larger_col == 1) {
                    start_col--;
                } else if (start_col < end_col) {
                    start_col++;
                }
                
                if (start_col == end_col && start_row == end_row) {
                    canvas[start_row][start_col] = shade;
                    exit = 1;
                }
            }
        }
       
        //Rectangle. Will print out a filled rectangle (stg 2)
        if (input[0] == 2) {
            int height_cnt = min(start_row, end_row);
            int print_cnt = min(start_col, end_col);
            end_row = start_row + end_row - height_cnt;
            end_col = start_col + end_col - print_cnt;
            //This function will print the rectangle line by line
            while (height_cnt <= end_row) {
                while (print_cnt <= end_col) {
                    canvas[height_cnt][print_cnt] = shade;
                    print_cnt++;
                }
                print_cnt = start_col;
                height_cnt++;
            }
        }      
        
        //Copy and Paste. (stg 3)
        int beginrow = min(input[1], input[3]);
        int begincol = min(input[2], input[4]);
        int resultrow = input[1] + input[3] - beginrow;
        int resultcol = input[2] + input[4] - begincol;
        int rowdis = resultrow - beginrow;
        int coldis = resultcol - begincol;
        printf("%d %d\n", rowdis, coldis);
