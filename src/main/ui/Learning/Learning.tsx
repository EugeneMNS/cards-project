import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {getCardsTC, setCardsAC} from '../../bll/cardsReducer';
import {QuestionModal} from './QuestionModal';
import {ErrorSnackbar} from '../common/Error/ErrorSnackbar';
import {CheckYourself} from './CheckYourself';
import {RootStateType} from '../../bll/store';
import {CardResponseType} from '../../dal/cardsAPI';
import {useParams} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import {CircularProgress} from "@mui/material";

export const Learning = React.memo(() => {
    const {packId, packName} = useParams()

    const dispatch = useDispatch();
    const [card, setCard] = useState<CardResponseType | null>(null);
    const [checkYourselfMode, setCheckYourselfMode] = useState<boolean>(false);
    const [questionMode, setQuestionMode] = useState<boolean>(true);
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    const cards = useSelector<RootStateType, CardResponseType[]>(state => state.cards.cards)

    const getCard = (cards: CardResponseType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        return cards[res.id + 1];
    }


    useEffect(() => {

        if (packId && isInitialized) {
            dispatch(getCardsTC({cardsPack_id: packId})as any)
        }
        return () => {
            dispatch(setCardsAC({cards: []}))
        }

    }, [])


    const checkYourselfModeOn = () => {
        setCheckYourselfMode(true)
        setQuestionMode(false)
    }
    const checkYourselfModeOff = () => {
        setCheckYourselfMode(false)
        setQuestionMode(true)
    }

    useEffect(() => {
        cards && setCard(getCard(cards))
    }, [cards])


    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }

    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: '40%',
                    textAlign: 'center',
                    width: '100%',
                    margin: 'auto',
                    borderRadius: '40%',
                }}
            >
                <CircularProgress />
            </div>

            {card && questionMode && <QuestionModal card={card}
                                                    packName={packName}
                                                    checkYourselfModeOn={checkYourselfModeOn}
                                                    questionMode={setQuestionMode}/>}
            {card && checkYourselfMode && <CheckYourself questionMode={setQuestionMode}
                                                         checkYourselfModeOff={checkYourselfModeOff}
                                                         card={card}
                                                         packName={packName}
            />}
            <ErrorSnackbar/>
        </>

    )


})
