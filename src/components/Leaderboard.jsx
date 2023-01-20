const Leaderboard = (props) => {
    // sort the array in ascending order by time
    const sortedLeaderboard = props.leaderboard.sort((a, b) => a.time - b.time);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedLeaderboard.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{props.timeConverter(data.time)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
