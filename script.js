$(function () {
    let userSelected = null;
    let pcSelected = null;  // Fixed typo: pcChoise -> pcSelected
    let userScore = 0;
    let pcScore = 0;
    let winner;



    // Update score display function
    function updateScoreDisplay() {
        $("#computer_score").text(pcScore);  // Fixed: was userScore, should be pcScore
        $("#user_score").text(userScore);    // Add this for user score
        $("#winner_message").text(winner);
    }

    function playAgain() {
        userSelected = null;
        pcSelected = null;
    }

    function updateSelectedIcon(iconSelected,who) {
        if(who=="user"){            
            switch (iconSelected) {
                case "scissor": $(".user_selected_Icon").addClass("fa-hand-scissors")
                    $(".user_selected_Icon").removeClass("fa-hand-fist")
                    $(".user_selected_Icon").removeClass("fa-hand")
                    break;
                case "paper": $(".user_selected_Icon").addClass("fa-hand")
                    $(".user_selected_Icon").removeClass("fa-hand-scissors")
                    $(".user_selected_Icon").removeClass("fa-hand-fist")
                    break;
                default: $(".user_selected_Icon").addClass("fa-hand-fist")
                    $(".user_selected_Icon").removeClass("fa-hand-scissors")
                    $(".user_selected_Icon").removeClass("fa-hand")
                    break;
            }
        }
        else{
             switch (iconSelected) {
                case "scissor": $(".pc_selected_Icon").addClass("fa-hand-scissors")
                    $(".pc_selected_Icon").removeClass("fa-hand-fist")
                    $(".pc_selected_Icon").removeClass("fa-hand")
                    break;
                case "paper": $(".pc_selected_Icon").addClass("fa-hand")
                    $(".pc_selected_Icon").removeClass("fa-hand-scissors")
                    $(".pc_selected_Icon").removeClass("fa-hand-fist")
                    break;
                default: $(".pc_selected_Icon").addClass("fa-hand-fist")
                    $(".pc_selected_Icon").removeClass("fa-hand-scissors")
                    $(".pc_selected_Icon").removeClass("fa-hand")
                    break;
        }
        console.log(who,iconSelected)
    }
}

  
    // Initial score display
    updateScoreDisplay();

    $(".hand").click(function () {
        if ($(this).hasClass("stone")) {
            userSelected = "stone";
        } else if ($(this).hasClass("paper")) {
            userSelected = "paper";
        } else if ($(this).hasClass("scissor")) {
            userSelected = "scissor";
        } else {
            userSelected = null;
            console.log("No valid choice selected!");
            return;
        }

        $(".hand_selection_section").addClass("hideSection");
        $(".selected_section").removeClass("hideSection");
        pcSelected = getComputerChoice();
        winner = calculateWinner(userSelected, pcSelected);
        updateSelectedIcon(userSelected,"user");
        updateSelectedIcon(pcSelected,"pc");
        // UPDATE THE DISPLAY AFTER EACH GAME
        updateScoreDisplay();
    });

    $("#play_Again").click(function () {
        playAgain()
        $(".selected_section").addClass("hideSection");
        $(".hand_selection_section").removeClass("hideSection")

    })

    function calculateWinner(user, pc) {
        if (user == pc) {
            return "It's a tie";
        }

        // User wins conditions
        if ((user == "stone" && pc == "scissor") ||
            (user == "paper" && pc == "stone") ||
            (user == "scissor" && pc == "paper")) {
            userScore++;
            return "User Wins";
        }

        // PC wins (all other cases)
        pcScore++;
        return "PC Wins";
    }

    function getComputerChoice() {
        const choices = ["stone", "paper", "scissor"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
});