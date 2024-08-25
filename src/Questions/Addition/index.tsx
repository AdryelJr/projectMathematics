
import { useState } from "react";
import ChooseLevel from "../ChooseLevel/1. index";
import Quiz from "./3. Quiz";
import Story from "./2. StoryAdd";

export const Addition: React.FC = () => {
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
            {showStory && <Story onAdvance={handleStoryAdvance} />}
            {showQuiz && level && <Quiz level={level} />}
        </div>
    );
};

