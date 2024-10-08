import { useState } from "react";
import ChooseLevel from "../_ChooseLevel/1. index";
import StoryMulti from "./2. StoryMulti";
import { QuizMulti } from "./3. QuizMulti";


export const Multiplication: React.FC = () => {
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
            {!level && <ChooseLevel operacao="multiplication" onLevelSelect={handleLevelSelect} />}
            {showStory && level && <StoryMulti level={level} onAdvance={handleStoryAdvance} />}
            {showQuiz && level && <QuizMulti level={level} operation="multiplication"/>}
        </div>
    );
};

