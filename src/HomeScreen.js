
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Dimensions, TouchableWithoutFeedback, SafeAreaView, Image } from 'react-native';
import {
    AdMobBanner, InterstitialAd, TestIds, AdEventType,
    RewardedAd,
    RewardedAdEventType,
    RewardedInterstitialAd,
    MaxAdContentRating,
    RewardedAdReward,
    BannerAd,
    BannerAdSize,
    BannerAdProps
} from 'react-native-google-mobile-ads';

const rewardedInterstitialAd = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});
const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});
const HomeScreen = () => {
    const [rewardPoints, setRewardPoints] = useState(0);

    const showInterstitialAd = async () => {
        console.log("ads loading...");
        await rewardedInterstitialAd.load()

    };

    useEffect(() => {
        rewardedInterstitialAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
            rewardedInterstitialAd.show();
        });
        rewardedInterstitialAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
            // Add reward points to the user's account
            // Alert.alert("Reward gets added to wallet");
            setRewardPoints(rewardPoints + 10);
        });
        // rewardedInterstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
        //     Alert.alert('Ad is closed so You did not receive any reward points')
        // });
    }, []);

    return (
        <View style={{ bottom: 44, backgroundColor: '#fff', height: Dimensions.get('window').height, }}>
            {/* Condisdering automatically safe areaview that's why given the bottom 44 */}
            <View style={{
                backgroundColor: '#70a3bd', elevation: 5, shadowColor: '#000',
                height: 30,
            }} />

            <View style={{
                backgroundColor: '#70a3bd', elevation: 5, shadowColor: '#000',
                height: 50,
                // justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center'
            }}>

                {/* <Image style={{ width: '100%', height: '100%' }} source={require('./Assests/Images/star.png')} /> */}
                {/* After the bottom 44 we need to avoid the notch of iOS devices use top 44 */}
                {/* <Text>You have {rewardPoints} reward points.</Text> */}
                <View style={{ width: Dimensions.get('window').width / 3, }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        elevation: 5, shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                        width: (55 + (rewardPoints > 9 ? 5 : rewardPoints > 99 ? 10 : 0))
                    }}>
                        <Image style={{ width: 25, height: 25, marginLeft: 5, }} source={require('./Assests/Images/star.png')} />
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#70a3bd', marginLeft: 5, marginRight: 5 }}>{rewardPoints}</Text>
                    </View>

                </View>
                <View style={{ width: Dimensions.get('window').width / 3, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', }}>{'Earn Money'}</Text>
                </View>
                <View style={{ width: Dimensions.get('window').width / 3, justifyContent: 'flex-end', alignItems: 'flex-end', right: 15 }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        elevation: 5, shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        borderRadius: 10,
                        flexDirection: 'row',
                    }}>
                        <Image style={{ width: 20, height: 20, marginLeft: 8, marginRight: 8, }} source={require('./Assests/Images/gear.png')} />
                    </View>

                </View>
            </View>




            <View style={{
                height: Dimensions.get('window').height,
                backgroundColor: '#fff',

            }}>
                <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
                <BannerAd size={BannerAdSize.INLINE_ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
                <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
                <BannerAd size={BannerAdSize.INLINE_ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
                <BannerAd size={BannerAdSize.LEADERBOARD} unitId={TestIds.BANNER} />

                <TouchableWithoutFeedback onPress={showInterstitialAd}>

                    <View style={{ position: 'absolute', bottom: 110, width: Dimensions.get('window').width, alignItems: 'center', }}>

                        <View style={{ backgroundColor: '#70a3bd', width: Dimensions.get('window').width - 60, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                            <Text style={{ fontSize: 16, fontWeight: '600', padding: 10, color: '#fff' }} >{'Earn by Watching'}</Text>
                            <Image style={{ width: 20, height: 20, }} source={require('./Assests/Images/video.png')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default HomeScreen;