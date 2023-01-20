import "../styles/Leaderboard.css";

const Leaderboard = (props) => {
    // sort the array in ascending order by time
    const sortedLeaderboard = props.leaderboard.sort((a, b) => a.time - b.time);

    return (
        <div className="leaderboard">
            <table>
                <thead>
                    <tr>
                        <th className="thPlace">Place</th>
                        <th className="thName">Name</th>
                        <th className="thTime">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedLeaderboard.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td className="tdPlace">{index + 1}</td>
                                <td>{data.name}</td>
                                <td className="tdTime">
                                    {props.timeConverter(data.time)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
