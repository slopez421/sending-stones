import React from "react";

function HomeMessage({listings}) {

    return <div className="grid cols-3">
        <div className="col-span-3">
    <div className="card w-xl shadow-2xl shrink-0">
        <div className="card-body">
            <div className="card-title text-primary justify-center">
                Welcome Adventurer!
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-5">
                <div className="col-span-4 text-lg">
                Weary travellers from every realm come to The Tavern seeking fellow adventuring companions.<br />

                Barbarians come in need of sneaky rogues for reconnoisance missions. <br />
                Clerics seek like-minded Paladins to aid their holy journey.<br />
                Wizards searching for Fighters to lend their strength and protection.<br />
                Whether you need an entire party or just an additional adventurer, The Tavern is the place to be.<br />
                Add a post to the adventuring board and your next party member could respond!
                
                </div>
                <div className="stats shadow">
                    <div className="stat bg-primary text-neutral-content">
                        <div className="stat-title text-neutral-content">Total Board Requests</div>
                        <div className="stat-value text-neutral-content">{listings.length}</div>
                        <div className="stat-desc text-neutral-content">Good luck on your journey!</div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
}

export default HomeMessage