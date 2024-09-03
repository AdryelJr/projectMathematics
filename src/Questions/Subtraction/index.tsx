import { useState } from "react";
import ChooseLevel from "../_ChooseLevel/1. index";
import { QuizSub } from "./3. QuizSub";
import StorySub from "./2.StorySub";

export const Subtraction: React.FC = () => {
    const [level, setLevel] = useState<string | null>(null);
    const [showStory, setShowStory] = useState<boolean>(false);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);

    const handleLevelSelect = (selectedLevel: string) => {
        setLevel(selectedLevel);
        setShowStory(true);
    };

    const handleStoryAdvance = () => {
        setShowStory(false);
        setShowQuiz(true);
    };

    return (
        <div className="content-addtion">
            {!level && <ChooseLevel onLevelSelect={handleLevelSelect} />}
            {showStory && level && <StorySub level={level} onAdvance={handleStoryAdvance} />}
            {showQuiz && level && <QuizSub level={level} operation="subtraction" />}
        </div>
    );
};
