import React from "react";
import { BottlesCard } from "./cardBuyBottles";
import './commercPart.css';

type TProps = {
    openLeftBar: Function
}

export const CommercPart:React.FC<TProps> = React.memo((props) => {
    return <div className="commerc-part-container">
        <div className="commerc-part-data-side">
            <div className="commerc-part-data-side-header">
                <div className="commerc-part-data-side-header-button-container">
                    <button type="button" className="commerc-part-data-side-header-other-button" onClick={() => props.openLeftBar()}></button>
                    <div className="commerc-part-data-side-header-part-name">Меню</div>
                </div>
                <div className="commerc-part-data-side-header-title">Управление бутылочками</div>
            </div>
            <div className="commerc-part-data-side-bottles-info">
                <div className="commerc-part-data-side-bottles-info-text-container">
                    <div className="commerc-part-data-side-bottles-info-text-title">Количество бутылочек уменьшается</div>
                    <div className="commerc-part-data-side-bottles-info-text-description">
                        <span>У вас осталось !!! бутылочек.</span>
                        <span>Вы можете в любой момент увеличить их количество.</span>
                    </div>
                </div>
                <div className="commerc-part-data-side-bottles-info-buy-cards-container">
                    <BottlesCard 
                        count={1}
                        discount={0}
                        price={150}
                        type={'one'}
                    />
                    <BottlesCard 
                        count={5}
                        discount={20}
                        price={600}
                        type={'five'}
                    />
                    <BottlesCard 
                        count={15}
                        discount={50}
                        price={1125}
                        type={'fiveteen'}
                    />
                </div>
            </div>
        </div>
        <div className="commerc-part-design-side">

        </div>
    </div>
})