import './Team.scss';

interface TeamMember {
    name: string;
    surname: string;
    img: string;
    description: string;
}


const Team = () => {

    const members: TeamMember[] = [
        {
            name: "Emilian",
            surname: "Hernes",
            img: "ProfilePicture1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda consectetur et quasi quis quos rem similique sit soluta vitae!"
        },
        {
            name: "Emilian",
            surname: "Hernes",
            img: "ProfilePicture2.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda consectetur et quasi quis quos rem similique sit soluta vitae!"
        },
        {
            name: "Emilian",
            surname: "Hernes",
            img: "ProfilePicture3.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda consectetur et quasi quis quos rem similique sit soluta vitae!"
        },
        {
            name: "Emilian",
            surname: "Hernes",
            img: "ProfilePicture4.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda consectetur et quasi quis quos rem similique sit soluta vitae!"
        },
        {
            name: "Emilian",
            surname: "Hernes",
            img: "ProfilePicture5.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda consectetur et quasi quis quos rem similique sit soluta vitae!"
        },
        {
            name: "Emilian",
            surname: "Hernes",
            img: "ProfilePicture6.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda consectetur et quasi quis quos rem similique sit soluta vitae!"
        }
    ]

    return (
        <div className="team">
            {members.map((member, i)=> (
                <section key={i} className="pearson">
                    <img src={'/images/'+member.img} alt={member.name}/>
                    <h2>{member.name} {member.surname}</h2>
                    <p>{member.description}</p>
                </section>
            ))}

        </div>
    )
}

export default Team;