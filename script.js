$(function () {
    let userSelected = null;
    let pcSelected = null;
    let userScore = 0;
    let pcScore = 0;
    let winner = "";

    function updateScoreDisplay() {
        $("#computer_score").text(pcScore);
        $("#user_score").text(userScore);
        $("#winner_message").text(winner);
    }

    function resetRings() {
        $(".you_picked .hand, .pc_picked_hand").removeClass("ring-win");
    }

    function playAgain() {
        userSelected = null;
        pcSelected = null;
        resetRings();
    }

    function updateSelectedIcon(iconSelected, who) {
        if (who === "user") {
            const el = $(".user_selected_Icon");
            el.removeClass("fa-hand fa-hand-fist fa-hand-scissors");
            if (iconSelected === "paper") el.addClass("fa-hand");
            else if (iconSelected === "scissor") el.addClass("fa-hand-scissors");
            else el.addClass("fa-hand-fist");
        } else {
            const el = $(".pc_selected_Icon");
            el.removeClass("fa-hand fa-hand-fist fa-hand-scissors");
            if (iconSelected === "paper") el.addClass("fa-hand");
            else if (iconSelected === "scissor") el.addClass("fa-hand-scissors");
            else el.addClass("fa-hand-fist");
        }
    }

    // Initial score display
    updateScoreDisplay();

    $(".hand_selection_section .hand").on("click", function () {
        if ($(this).hasClass("stone")) userSelected = "stone";
        else if ($(this).hasClass("paper")) userSelected = "paper";
        else if ($(this).hasClass("scissor")) userSelected = "scissor";
        else return;

        $(".hand_selection_section").addClass("hideSection");
        $(".selected_section").removeClass("hideSection");
        pcSelected = getComputerChoice();
        winner = calculateWinner(userSelected, pcSelected);
        updateSelectedIcon(userSelected, "user");
        updateSelectedIcon(pcSelected, "pc");

        resetRings();
        if (winner === "User Wins") {
            $(".you_picked .hand").addClass("ring-win");
            $("#winner_message").html("<span class='big'>YOU WIN</span><span class='sub'>AGAINST PC</span>");
            $("#play_Again").text("PLAY AGAIN");
            $("#next_btn").removeClass("hideSection");
        } else if (winner === "PC Wins") {
            $(".pc_picked_hand").addClass("ring-win");
            $("#winner_message").html("<span class='big'>YOU LOST</span><span class='sub'>AGAINST PC</span>");
            $("#play_Again").text("PLAY AGAIN");
            $("#next_btn").addClass("hideSection");
        } else {
            $("#winner_message").html("<span class='big'>TIE UP</span>");
            $("#play_Again").text("REPLAY");
            $("#next_btn").addClass("hideSection");
        }

        updateScoreDisplay();
    });

    $("#play_Again").on("click", function () {
        playAgain();
        $(".selected_section").addClass("hideSection");
        $(".hand_selection_section").removeClass("hideSection");
        $("#next_btn").addClass("hideSection");
    });

    // Rules modal
    $("#rules_btn").on("click", function(){
        $("#rules_modal").removeClass("hideSection");
    });
    // Next navigates to win screen
    $("#next_btn").on("click", function(){
        $("#win_screen").removeClass("hideSection");
    });
    // Play again from win screen
    $("#play_again_win").on("click", function(){
        $("#win_screen").addClass("hideSection");
        $("#play_Again").trigger("click");
    });
    // Close rules (delegated to handle any DOM changes)
    $(document).on("click", ".close_rules, .close_rules i", function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#rules_modal").addClass("hideSection");
    });
    // click outside the card closes the modal
    $(document).on("click", "#rules_modal", function(e){
        if (e.target === this) $(this).addClass("hideSection");
    });
    // ESC key closes modal
    $(document).on("keydown", function(e){
        if (e.key === "Escape") $("#rules_modal").addClass("hideSection");
    });

    function calculateWinner(user, pc) {
        if (user === pc) return "Tie";
        if ((user === "stone" && pc === "scissor") ||
            (user === "paper" && pc === "stone") ||
            (user === "scissor" && pc === "paper")) {
            userScore++; return "User Wins";
        }
        pcScore++; return "PC Wins";
    }

    function getComputerChoice() {
        const choices = ["stone", "paper", "scissor"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }
});