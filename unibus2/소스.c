Class Schedule{
	List joewonList // 리스트 내에 Joewon 객체들로 구성됨.
	List scheduleList // [ [[요일1],[ [시간1,시간1'], [시간2, 시간2']... ]], [[요일2],[ [시간1, 시간2] ,... ]]... ]
	List joewonAssigned // [ [ [요일1], [조원1, 조원2, 조원3...] ], [ [요일2], [조원2, 조원4,...] ],... ]

	Func __init__(Self, joewonList) {
		Self.jeowonList = joewonList
	}

	Func setPriority(Self.joewonList, Int pivot) { // quic sort로 가중치의 내림차순으로 joewonList를 정렬한다.
		Int low = pivot + 1
		Int high = len(Self.joewonList)-1
		
		While Not low + 1 == high - 1
		{
			
		}
	}

	Func getSchedule(Self.joewonList, Self.scheduleList, Self.joewonAssigned) {
		List tempList = Self.joewonList[0].dataList // 이미 int형 분 단위로 환산된 dataList다!
		List tempTempList = [NULL]
		String yoil = "\0"
		For Int i In(1, len(joewonList))
		{
			For Int j In(0,len(tempList)) // tempList에 있는 요일의 개수만큼 반복 => 가중치가 높은 조원들이 가능한 요일들만 고려!
			{
				yoil=tempList[j][0]
				tempTempList=isPossible(tempList[j][1],joewonList[i][joewonList.Index(yoil)][1])
				If tempTempList != NULL
				{
					tempList[j][1] = tempTempList
					Append i To joewonAssigned[joewonAssigned.Index(yoil)][1]
				}
				tempTempList=NULL
			}
		}
		Self.scheduleList = tempList
	}

	Func isPossible(dataList1, dataList2) { // 두 인자 형식: [ [시간1, 시간1'], [시간2, 시간2'] ]
		List newDataList=[NULL]
		For Int i In(0,len(dataList1))
		{
			For Int j In(0,len(dataList2))
			{
				If dataList1[i][0]<dataList2[j][1]<dataList1[i][1]
				{
					If dataList2[j][0] < dataList1[i][0]
						tempList=[dataList1[i][0],dataList2[j][1]]
						
					Else
						tempList=dataList2[j]
				}
				Else If dataList2[j][1]>=dataList1[i][1]
				{
					If dataList2[j][0] <= dataList1[i][0]
						tempList = dataList1[i]
					Else If dataList1[i][0] < dataList2[j][0] <= dataList1[i][1]
						tempList = [dataList2[j][0], dataList1[i][1]]
				}
				Else If dataList2[j][1] == dataList1[i][0]
					tempList=[dataList2[i][1],dataList2[i][1]]
				Append tempList To newDataList
			}
		}
		Return newDataList
	}

	Func getRecommandation(Self.scheduleList, Self.joewonAssigned) {
		Int sum = 0
		Int minAvg = 0
		Int minIndex = 0
		For Int i In(0,len(joewonAssigned))
		{
			For Int j In(0,len(joewonAssigned[i][1]))
			{
				sum += joewonAssigned[i][1][j]
			}
			If minAvg == 0
			{
				minAvg = sum / len(joewonAssigned[i][1])
				minIndex = 0
			}
			Else
				If minAvg > sum / len(joewonAssigned[i][1])
				{
					minAvg = sum / len(joewonAssigned[i][1])
					minIndex = i
				}
			sum=0
		}
		Return Self.scheduleList[minIndex]
	}
}

Class Joewon{
	String name
	Int weight
	List dataList // dict 형식이 가능하다면 dict형식으로{"Mon":[[09:00,10:15],[18:00,21:00]],"Tue":[[12:00,14:00]]}
				  // dict 형식이 불가능하면 Data 객체들로 구성된 리스트
	Func convertData(Self.dataList) {
		Int weekNum = Len(Self.dataList)
		Int fromMinute = 0
		Int toMinute = 0
		List newList = [NULL]
		List tempList = [NULL]
		List newListList = [[NULL]]
		List newListListList = [[[NULL]]]
		For Int i In (0, weekNum)
		{
			Append Self.dataList[i][0] To newListList // "Mon" newListList에 추가
			For Int j in(0, Len(Self.dataList[i][1])) // 하루 당 시간 대의 개수만큼 반복
			{
				fromMinute = Self.convertCharToInt(Self.dataList[i][1][j][0]) // 인자 형태: [09:00], 반환 형태: [540]
				toMinute = Self.convertCharToInt(Self.dataList[i][1][j][1]) // 인자 형태: [10:15], 반환 형태: [615]
				Append fromMinute To tempList
				Append toMinute To tempList
				Append tempList To newList
				Set TempList [NULL]
			}
			Append newList To newListList // [ ["Mon"], [[540, 615], [1080, 1260]] ]의 형태로 newListList 생성
			Set newList [NULL]
			Append newListList To newListListList // [ [ ["Mon"], [ [1233,4224], [2323,43341] ] ], [ ["Tue"], [ [ 33553, 34343], [1411443, 33425] ] ] ]의 형태 
			Set newListList [[NULL]]
		}
		Self.dataList = newListListList // int형 분 단위로 환산된 데이터로 구성된 데이타 리스트가 객체 dataList로 저장됨.
	}

	Func convertCharToInt(dataList) { // [09:00,12:00] 형식의 인자 받음
		List newList = [NULL]
		Int temp = 0
		For Int i In (0,2)
		{
			For Int j In(0,5)
			{
				If j == 0 Or j == 1
				{
					temp += dataList[i][j] * 10^(1-j) * 60
				}
				Else If j == 3 Or j == 4
				{
					temp+= dataList[i][j] * 10^(4-j)
				}
				Else
					Continue
			}
			Append temp To newList
			temp = 0
		}
		Return newList
	}
}

Class Joejang extends Joewon{
	Const super().weight = 10
}

Class Data{
	String name
	String week
	List timeData // 이중 리스트 형식으로 [[09:00,10:15],[12:15,13:00]]

	Func createDataList(Self.week, Self.timeData){
		dataList=[Self.week, Self.timeData]
		Return dataList
	}
}

Input data들 From 조원s To Data Object
Input Data Object들 To Joewon Object
Joewon Object.convertData()
Input Joewon Object들 To Schedule Object
Schedule Object.setPriority()
Schedule Object.getSchedule()
Print(Schedule Object.getRecommandation())
