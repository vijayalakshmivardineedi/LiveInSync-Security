import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native'
import { Avatar,  } from "react-native-paper";
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import ProgressBar1 from "./ProgressBar";
import socketServices from '../../../Socket/SocketServices';
const Polls = () => {
    const [polls, setPolls] = useState([]);
    const [checkedOption, setCheckedOption] = useState(null);
    const societyId = "6683b57b073739a31e8350d0";
    useEffect(() => {
        socketServices.initializeSocket();
        socketServices.emit('get_polls_by_society_id', { societyId });
        const handlePollsBySocietyId = (fetchedPolls) => {
            setPolls(fetchedPolls);
        };
        const handleVoteUpdate = (data) => {
            alert(data.message)
            setPolls(prevPolls => {
                // Check if the updated poll exists in the previous polls data
                const updatedPollIndex = prevPolls.findIndex(poll => poll._id === data.votes._id);
                if (updatedPollIndex !== -1) {
                    // Replace the old poll data with the updated poll data
                    const updatedPolls = [...prevPolls];
                    updatedPolls[updatedPollIndex] = data.votes;
                    return updatedPolls;
                } else {
                    // If the updated poll is not found (this should not happen ideally)
                    console.warn("Updated poll not found in current state");
                    return prevPolls;
                }
            });

            setCheckedOption(null);
        };

        const handleNewPollCreated = (newPoll) => {
            setPolls((prevPolls) => [newPoll, ...prevPolls]);
        };

        const handleVoteError = (error) => {
            alert(error.message);
        };

        socketServices.on('polls_by_society_id', handlePollsBySocietyId);
        socketServices.on('vote_update', handleVoteUpdate);
        socketServices.on('new_poll_created', handleNewPollCreated);
        socketServices.on('vote_error', handleVoteError);

        return () => {
            socketServices.removeListener('polls_by_society_id', handlePollsBySocietyId);
            socketServices.removeListener('new_poll_created', handleNewPollCreated);
            socketServices.removeListener('vote_update', handleVoteUpdate);
            socketServices.removeListener('vote_error', handleVoteError);
        };
    }, [societyId]);

    const handleRadioButtonPress = (optionValue, pollId) => {
        setCheckedOption(optionValue);
        const data = {
            userId: "3Z6S5JTx2",
            pollId: pollId,
            selectedOption: optionValue
        };
        socketServices.emit('vote_for__polls_by_UserID', data);
    };

    const calculateTimeDifference = (startDate) => {
        const currentDate = new Date();
        const startTime = new Date(startDate);
        const secondsDifference = Math.floor((currentDate - startTime) / 1000);
        const hoursDifference = Math.floor(secondsDifference / 3600);
        return hoursDifference;
    };

    const isMoreThanTwoLines = (text) => {
        if (!text) return false; // Return false if text is empty or undefined
        const numberOfLines = text.split('\n').length;
        return numberOfLines > 2;
    };

    const calculateVotePercentage = (votes, option) => {
        const totalVotes = votes.length;
        const optionVotes = votes.filter(vote => vote.selectedOption === option).length;
        return totalVotes === 0 ? 0 : (optionVotes / totalVotes);
    };

    return (
        <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "#fff", flex: 1 }}>
            {polls.map((item) => (
                item.poll.Status === true ? (
                    <View key={item._id} style={{ paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "#777", backgroundColor: "#f6f6f6", borderRadius: 8 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Avatar.Image size={55} source={require("../../../../../assets/User/images/man.png")} />
                                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 600 }}>Admin</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 400, color: "#777" }}>{`${calculateTimeDifference(item.poll.date)} hr ago`}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{ padding: 5, backgroundColor: "#dcfce7", borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: "#16a34a" }}>
                                    <Text style={{ color: "#16a34a", fontWeight: 600 }}>{item.poll.Status === true ? "Active" : "Close"}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 700, fontSize: 18 }}>{item.poll.question}</Text>
                            {isMoreThanTwoLines(item.poll.Description) ? (
                                <Text style={{ fontWeight: 400, fontSize: 14 }}>{item.poll.Description} <Text style={{ fontWeight: 400, fontSize: 14, color: "#777" }}>Read More</Text></Text>
                            ) : (
                                <Text style={{ fontWeight: 400, fontSize: 14 }}>{item.poll.Description}</Text>
                            )}
                            {/* Mapping over options */}
                            {item.poll.options.map((option, index) => (
                                <View key={index} style={{ flexDirection: 'row', paddingVertical: 6 }}>
                                    <RadioButton
                                        value={option}
                                        status={checkedOption === option ? 'checked' : 'unchecked'}
                                        onPress={() => handleRadioButtonPress(option, item)} // Update checkedOption state
                                    />
                                    <View style={{ flexDirection: "column", width: "85%" }}>
                                        <Text style={{ fontWeight: 500, fontSize: 18 }}>{option}</Text>
                                        {/* Replace with your actual progress calculation */}
                                        <ProgressBar progress={calculateVotePercentage(item.poll.votes, option)} color={MD3Colors.error50} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View key={item._id} style={{ paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderWidth: 1, borderColor: "#777", backgroundColor: "#f6f6f6", borderRadius: 8 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Avatar.Image size={55} source={require("../../../../../assets/User/images/man.png")} />
                                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 600 }}>Admin</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 400, color: "#777" }}>
                                        {new Date(item.poll.date).toLocaleDateString()} {' '}
                                        {new Date(item.poll.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        <Text style={{ fontSize: 16, fontWeight: 400, color: "#777" }}>{item.poll.votes.length} Votes</Text>
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View style={{ padding: 5, backgroundColor: "#fee2e2", borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: "#dc2626" }}>
                                    <Text style={{ color: "#dc2626", fontWeight: 600 }}>{item.poll.Status === false ? "Close" : "Active"}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 700, fontSize: 18 }}>{item.poll.question}</Text>
                            {isMoreThanTwoLines(item.poll.Description) ? (
                                <Text style={{ fontWeight: 400, fontSize: 14 }}>{item.poll.Description} <Text style={{ fontWeight: 400, fontSize: 14, color: "#777" }}>Read More</Text></Text>
                            ) : (
                                <Text style={{ fontWeight: 400, fontSize: 14 }}>{item.poll.Description}</Text>
                            )}
                            {/* Mapping over options */}
                            {item.poll.options.map((option, index) => (
                                <View key={index} style={{ flexDirection: 'row', paddingVertical: 6 }}>
                                    <View style={{ flexDirection: "column", width: "85%" }}>
                                        <Text style={{ fontWeight: 500, fontSize: 18 }}>{option}</Text>
                                        <ProgressBar1 value={calculateVotePercentage(item.poll.votes, option) * 100} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )
            ))}
        </View>
    )
}

export default Polls;