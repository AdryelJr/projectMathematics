import { useState } from "react";
import ChooseLevel from "../_ChooseLevel/1. index";
import StoryDivi from "../Division/2. StoryDivi";
import QuizDivi from "../Division/3. QuizDivi";

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
            {showStory && <StoryDivi onAdvance={handleStoryAdvance} />}
            {showQuiz && level && <QuizDivi level={level} />}
        </div>
    );
};

