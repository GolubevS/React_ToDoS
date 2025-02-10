import { ChangeEventHandler, useState } from 'react';
import TodosList from '@/features/todos/components/TodosList';
import Filters from './features/filter/components/Filters';

const App = () => {
    const [isAsync, setIsAsync] = useState(false);

    const onAsyncChanged: ChangeEventHandler<HTMLInputElement> = (e) => 
        setIsAsync(e.target.checked);

    return (
    <>
        <label>
            async mode
            <input 
                name='isAsync'
                type='checkbox'
                checked={isAsync}
                onChange={onAsyncChanged}
            />
        </label>
        <Filters/>
        <TodosList isAsync={isAsync} />
    </>    
)};

export default App;
